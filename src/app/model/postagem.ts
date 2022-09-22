import { tema } from "./tema"
import { usuario } from "./usuario"

export class postagem{
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public usuario: usuario // fazer o relacionamento entre as tabelas no front
    public tema: tema     // relacionamento entre as tabelas, um tema só para cada postagem do tipo tema 'one to many'
    public foto: string
}