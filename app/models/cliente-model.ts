import BaseModel from "./base-model"

export default class ClienteModel extends BaseModel {
    nome: string
    dataNascimento: string
    imagem: string
    servicoId: string

    constructor(obj?: any) {
        super()
        if (obj) {
            this.nome = obj.nome
            this.dataNascimento = obj.dataNascimento
            this.status = obj.status
            this.imagem = obj.imagem
            this.servicoId = obj.servicoId
        }
    }
}