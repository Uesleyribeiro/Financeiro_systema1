from backend.app import db
from datetime import datetime

class Orcamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ano = db.Column(db.Integer, nullable=False)
    mes = db.Column(db.Integer, nullable=False)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categoria.id'), nullable=False)
    valor_previsto = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    categoria = db.relationship('Categoria', backref=db.backref('orcamentos', lazy=True))

    __table_args__ = (db.UniqueConstraint('ano', 'mes', 'categoria_id', name='uq_orcamento_ano_mes_categoria'),)
