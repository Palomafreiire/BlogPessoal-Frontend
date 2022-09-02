import { postagem } from "./postagem"

export class tema{
    public id: number
    public descricao: string
    public postagem: postagem[]   // relacionamento entre tabelas; bota isso [] para indicar que vai ter um array de postagem
            // varias postagens para um tema 'many to one'
}