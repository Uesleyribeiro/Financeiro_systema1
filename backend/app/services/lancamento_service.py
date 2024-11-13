from backend.app import db
from backend.app.models.lancamento import Lancamento
from backend.app.models.categoria import Categoria
from backend.app.models.conta_bancaria import ContaBancaria

def criar_lancamento(data):
    categoria = Categoria.query.filter_by(nome=data['categoria']).first()
    if not categoria:
        categoria = Categoria(nome=data['categoria'], tipo=data['tipo'])
        db.session.add(categoria)

    conta_bancaria = None
    if 'conta_bancaria' in data:
        conta_bancaria = ContaBancaria.query.filter_by(nome=data['conta_bancaria']).first()
        if not conta_bancaria:
            conta_bancaria = ContaBancaria(nome=data['conta_bancaria'])
            db.session.add(conta_bancaria)

    lancamento = Lancamento(
        data=data['data'],
        descricao=data['descricao'],
        valor=data['valor'],
        tipo=data['tipo'],
        categoria=categoria,
        subcategoria=data.get('subcategoria'),
        forma_pagamento=data.get('forma_pagamento'),
        centro_custo_id=data.get('centro_custo_id'),
        conta_bancaria=conta_bancaria,
        status=data.get('status'),
        observacao=data.get('observacao')
    )

    db.session.add(lancamento)
    db.session.commit()
    return lancamento

def atualizar_lancamento(id, data):
    lancamento = Lancamento.query.get_or_404(id)
    for key, value in data.items():
        if key == 'categoria':
            categoria = Categoria.query.filter_by(nome=value).first()
            if not categoria:
                categoria = Categoria(nome=value, tipo=lancamento.tipo)
                db.session.add(categoria)
            lancamento.categoria = categoria
        elif key == 'conta_bancaria':
            conta_bancaria = ContaBancaria.query.filter_by(nome=value).first()
            if not conta_bancaria:
                conta_bancaria = ContaBancaria(nome=value)
                db.session.add(conta_bancaria)
            lancamento.conta_bancaria = conta_bancaria
        else:
            setattr(lancamento, key, value)
    db.session.commit()
    return lancamento

def deletar_lancamento(id):
    lancamento = Lancamento.query.get_or_404(id)
    db.session.delete(lancamento)
    db.session.commit()
