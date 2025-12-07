import api from "./api";

export const getSaldo = () => api.get("/contas/saldo");
export const depositar = (valor) => api.post("/contas/depositar", { valor });
export const sacar = (valor) => api.post("/contas/sacar", { valor });
export const getTransacoes = () => api.get("/contas/transacoes");
