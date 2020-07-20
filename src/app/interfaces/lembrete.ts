type prioridade = 'BAIXA' | 'MEDIA' | 'ALTA';
export interface Lembrete {
    id: number;
    conteudo: string;
    prioridade: prioridade;
}
