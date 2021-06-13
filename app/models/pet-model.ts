import BaseModel from "./base-model"

export default class PetModel extends BaseModel {
    nome: string
    especie: string
    idadeEmMeses: number
    imagem: string
    clienteId: string

    constructor(obj?: any) {
        super()
        if (obj) {
            this.nome = obj.nome
            this.especie = obj.especie
            this.idadeEmMeses = obj.idadeEmMeses
            this.imagem = obj.imagem
            this.clienteId = obj.clientId
        }
    }
}