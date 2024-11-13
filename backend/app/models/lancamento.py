from backend.app import db
from datetime import datetime

class Lancamento(db.Model):
    __tablename__ = 'lancamentos'
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.Date, nullable=False)
    descricao = db.Column(db.String(255), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    tipo = db.Column(db.String(50), nullable=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=False)
    subcategoria = db.Column(db.String(100))
    forma_pagamento = db.Column(db.String(100))
    centro_custo_id = db.Column(db.Integer, db.ForeignKey('centros_custo.id'))
    conta_bancaria_id = db.Column(db.Integer, db.ForeignKey('contas_bancarias.id'))
    status = db.Column(db.String(50))
    observacao = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    categoria = db.relationship('Categoria', backref=db.backref('lancamentos', lazy=True))
    conta_bancaria = db.relationship('ContaBancaria', backref=db.backref('lancamentos', lazy=True))
    centro_custo = db.relationship('CentroCusto', backref=db.backref('lancamentos', lazy=True))

    def __repr__(self):
        return f'<Lancamento {self.descricao}>'
