export interface Lancamento {
  id?: number;
  data: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  subcategoria?: string;
  forma_pagamento?: string;
  centro_custo?: string;
  conta_bancaria?: string;
  status?: string;
  observacao?: string;
}

export interface CentroCusto {
  id?: number;
  nome: string;
  descricao?: string;
  ativo: boolean;
}

// Adicione mais interfaces conforme necessário
