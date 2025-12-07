FinanPro — Plataforma de Organização Financeira

FinanPro é uma aplicação web que ajuda usuários a organizar suas finanças, acompanhar gastos, definir metas e controlar conquistas financeiras através de um calendário interativo.
O projeto une simplicidade, design moderno e automação inteligente, oferecendo uma experiência fluida e intuitiva.

 Funcionalidades Principais

 Controle Financeiro: registre receitas, despesas e visualize gráficos de desempenho.

 Calendário de Lembretes: adicione lembretes de pagamentos, metas e conquistas.

 Sistema de Conquistas: desbloqueie badges conforme atinge seus objetivos financeiros.

 Painel Analítico: gráficos de gastos por categoria, evolução mensal e saldo acumulado.

 Autenticação Segura: login e cadastro com validação.

 Mock API: simula um backend em Python para testes locais.

 Layout Responsivo: interface moderna e adaptável a qualquer dispositivo.

 Animações com Framer Motion: transições suaves e interativas.

 -------------------------------------------------------------------------------------------------------------------------------------------------------
 Tecnologias Utilizadas
Frontend

React.js — estrutura principal do front-end

Vite — ferramenta de build ultrarrápida

Tailwind CSS — estilização moderna e responsiva

Framer Motion — animações e transições suaves

Backend (Mock API / futura integração real)

Python + Flask / FastAPI — para simulação e integração de endpoints financeiros

JSON Server (modo dev) — para prototipagem de dados
 -------------------------------------------------------------------------------------------------------------------------------------------------------

 Instalação e Execução
1. Clone o repositório
git clone https://github.com/seuusuario/finanpro.git
cd finanpro

2. Instale as dependências
npm install

3. Inicie o servidor de desenvolvimento
npm run dev


O projeto rodará normalmente em:
http://localhost:5173

📁 Estrutura do Projeto
finanpro/
├── public/
│   ├── favicon.ico
│   └── logo.png
│   └── email.png
│   └── Home-devices.png
│   └── imagemmenina.png
│   └── imagemmulher.png
│   └── instagram.png
│   └── mulher2.png
│   └── react.svg
│   └── zap.png
├── src/
│   ├── assets/              # imagens, ícones
│   ├── components/          # componentes reutilizáveis (Navbar, Card e Sidebar)
│   ├── pages/               # páginas principais (Home, Dashboard, Login, etc)
│   ├── data/                # mocks e JSONs de exemplo
│   ├── services/            # conexão com Mock API/ backend Python
│   ├── App.jsx              # rotas e layout base
│   └── main.jsx             # ponto de entrada
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
 -------------------------------------------------------------------------------------------------------------------------------------------------------------

 Modelo de Dados (Exemplo)

Usuário

{
  "id": 1,
  "nome": "Maria",
  "email": "maria@email.com",
  "saldo": 2500.00
}


Transação

{
  "id": 12,
  "tipo": "despesa",
  "categoria": "Alimentação",
  "valor": 45.90,
  "data": "2025-11-10",
  "descricao": "Jantar com amigos"
}



Você pode simular o backend com Flask ou FastAPI:

Exemplo com Flask
from flask import Flask, jsonify, request

app = Flask(__name__)

transacoes = [
    {"id": 1, "tipo": "receita", "valor": 3000, "categoria": "Salário"},
    {"id": 2, "tipo": "despesa", "valor": 200, "categoria": "Transporte"},
]

@app.route("/api/transacoes", methods=["GET"])
def get_transacoes():
    return jsonify(transacoes)

@app.route("/api/transacoes", methods=["POST"])
def add_transacao():
    nova = request.get_json()
    transacoes.append(nova)
    return jsonify(nova), 201

if __name__ == "__main__":
    app.run(debug=True)

 -------------------------------------------------------------------------------------------------------------------------------------------------------------

  Principais Componentes
  
Componente	Descrição
Navbar	Barra de navegação com links para páginas principais
HeroSection	Seção inicial de destaque (slogan + imagem)
Calendário	Mostra eventos e lembretes financeiros
Sidebar  Barra de navegação com links para páginas privadas
Card	Bloco que exibe informações resumidas

  Rotas da Aplicação
Rota	Página	Descrição
/	Home	Página inicial com informações e botão “Comece Agora”
/login	Login	Tela de autenticação
/dashboard	Painel Financeiro	Área do usuário com gráficos e metas
/register Pagina de criação de conta 
/cofre pagina de armazenar dinheiro
/chatia Chat especializado em finanças para te ajudar
/dicas pagina sobre dicas financeiras 
/calendario	Calendário	Lembretes e conquistas
/sobre	Sobre o Projeto	Informações e equipe
/suporte	Suporte	Contato e ajuda ao usuário
  Contribuição

Contribuições são muito bem-vindas! 
Siga os passos:

Faça um fork do repositório

Crie uma branch para sua feature:

git checkout -b minha-feature


Faça o commit das mudanças:

git commit -m "Adiciona nova funcionalidade"


Envie sua branch:

git push origin minha-feature


Abra um Pull Request 
 -------------------------------------------------------------------------------------------------------------------------------------------------------------

 Licença

Este projeto está licenciado sob a MIT License — você é livre para usar, modificar e distribuir, desde que mantenha os créditos ao autor original.

 ---------------------------------------------------------------------------------------------------------------------------------------------------------------

 Autores

Maria Júlia Alves de Almeida
Lyan Angel Rodrigues Gregorio
Gustavo Andrade Vidal
Guilherme Raimundo Garcia 
Davi Kind Silva

 Projeto acadêmico — FinanPro: controle financeiro inteligente para jovens e iniciantes.

 Cada meta alcançada, cada lembrete cumprido e cada conquista registrada são passos rumo a uma vida financeira mais leve, organizada e consciente.