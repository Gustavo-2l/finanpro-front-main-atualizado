import { InferenceClient } from "@huggingface/inference";

// Token precisa começar com VITE_
const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

export async function enviarParaIA(mensagemUsuario, historicoConversa = []) {
  if (!mensagemUsuario?.trim()) {
    throw new Error("Mensagem vazia");
  }

  try {
    const mensagensContexto = [
      {
        role: "system",
        content: `Você é uma IA financeira do FinanPro, especializada em educação financeira, organização de gastos e apoio a decisões econômicas pessoais. Suas características:
        
        - Ofereça orientações baseadas em princípios sólidos de finanças pessoais
        - Mantenha um tom claro, acessível, educativo e motivador
        - Sugira estratégias práticas e realistas para o controle financeiro
        - Considere responsabilidade, ética e segurança em todas as recomendações
        - Leve em conta o contexto da conversa anterior e a situação do usuário
        - Seja objetivo e específico nas orientações
        - Utilize conceitos de planejamento financeiro, economia comportamental e métodos de organização financeira
        
        FORMATAÇÃO DAS RESPOSTAS:
        - Use markdown para estruturar suas respostas
        - Utilize títulos (##), subtítulos (###) e listas (-)
        - Destaque termos importantes com **negrito**
        - Separe seções de forma clara e visual
        - Quando necessário, apresente passos numerados para orientar o usuário
        - Finalize com uma pergunta de acompanhamento quando útil
        
        Você está auxiliando usuários do FinanPro a tomar decisões financeiras mais seguras, conscientes e eficientes.
        `
        
      }
    ];

    const historicoRecente = historicoConversa.slice(-10);
    historicoRecente.forEach(msg => {
      mensagensContexto.push({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content
      });
    });

    mensagensContexto.push({ role: "user", content: mensagemUsuario });

    const resposta = await client.chatCompletion({
      model: "zai-org/GLM-4.5", // ✅ modelo compatível com front-end
      messages: mensagensContexto,
      max_tokens: 1500,
      temperature: 0.7,
      top_p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1
    });

    const conteudo = resposta?.choices?.[0]?.message?.content?.trim();

    if (!conteudo) {
      throw new Error("Resposta vazia da IA");
    }

    return conteudo.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  } catch (error) {
    console.error("Erro na API Hugging Face:", error);

    if (error.status === 401) throw new Error("Token de API inválido");
    if (error.status === 429) throw new Error("Limite de requisições atingido");
    if (error.message?.includes("fetch")) throw new Error("Erro de rede");

    throw new Error("Erro inesperado ao conectar com a IA");
  }
}
