from backend.app.models.produto import Produto
from backend.app.models.lancamento import Lancamento
from sqlalchemy import func
from datetime import datetime

def calcular_rentabilidade(inicio, fim):
    produtos = Produto.query.all()
    resultados = []

    for produto in produtos:
        vendas = Lancamento.query.filter(
            Lancamento.data.between(inicio, fim),
            Lancamento.tipo == 'Receita',
            Lancamento.descricao.like(f'%{produto.nome}%')
        ).with_entities(func.sum(Lancamento.valor)).scalar() or 0

        custos = vendas * (produto.custo / produto.preco_venda)
        lucro = vendas - custos
        margem = (lucro / vendas) * 100 if vendas > 0 else 0

        resultados.append({
            'produto': produto.nome,
            'vendas': float(vendas),
            'custos': float(custos),
            'lucro': float(lucro),
            'margem': float(margem)
        })

    return resultados
