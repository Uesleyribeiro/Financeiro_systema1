from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Empresa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    cnpj = db.Column(db.String(14), unique=True, nullable=False)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

    plano_contas = db.relationship('PlanoContas', backref='empresa', lazy=True)
    transacoes = db.relationship('Transacao', backref='empresa', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'cnpj': self.cnpj,
            'data_criacao': self.data_criacao.isoformat()
        }

class PlanoContas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'), nullable=False)
    codigo = db.Column(db.String(20), nullable=False)
    descricao = db.Column(db.String(200), nullable=False)
    tipo = db.Column(db.String(1), nullable=False)  # 'R' para receita, 'D' para despesa

    def to_dict(self):
        return {
            'id': self.id,
            'empresa_id': self.empresa_id,
            'codigo': self.codigo,
            'descricao': self.descricao,
            'tipo': self.tipo
        }

class Transacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'), nullable=False)
    plano_contas_id = db.Column(db.Integer, db.ForeignKey('plano_contas.id'), nullable=False)
    data = db.Column(db.Date, nullable=False)
    valor = db.Column(db.Float, nullable=False)
    descricao = db.Column(db.String(200))

    plano_contas = db.relationship('PlanoContas', backref='transacoes')

    def to_dict(self):
        return {
            'id': self.id,
            'empresa_id': self.empresa_id,
            'plano_contas_id': self.plano_contas_id,
            'data': self.data.isoformat(),
            'valor': self.valor,
            'descricao': self.descricao,
            'tipo': self.plano_contas.tipo
        }
