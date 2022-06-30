import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080/'
})

export const getChamados = async () =>{
    return await api.get("/dashboard");
}

export const cadastrarUsuario = async (nome, email) =>{
    return await api.post("/profile", {nome, email});
}

export const cadastrarChamado = async (clienteId, nomeCliente, assunto, status, complemento) =>{
    return await api.post("/new", {clienteId, nomeCliente, assunto, status, complemento});
}

export const getClientes = async () =>{
    return await api.get("/costumers");
}

export const cadastrarCliente = async (cliente) =>{
    return await api.post("/costumers", cliente);
}

export const clientById = async (clienteId) =>{
    return await api.get(`/costumers/${clienteId}`);
}

export const deleteCliente = async (Id) => {
    return await api.delete(`costumers/${Id}`);
}

export const updateCliente = async (clienteId, clienteDescricao) => {
    return await api.put(`/costumers/${clienteId}`, clienteDescricao)
}