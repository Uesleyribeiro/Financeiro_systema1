from backend.app import db
from sqlalchemy import UniqueConstraint

class Categoria(db.Model):
    __tablename__ = 'db_categoria'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    tipo = db.Column(db.String(50), nullable=False)

    # Define o relacionamento com a tabela Subcategoria
    subcategorias = db.relationship('Subcategoria', backref='categoria', lazy=True)

    def __repr__(self):
        return f'<Categoria {self.nome}>'

class Subcategoria(db.Model):
    __tablename__ = 'db_subcategoria'
    __table_args__ = (UniqueConstraint('nome', 'categoria_id', name='uq_nome_categoria'),)
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    # Chave estrangeira que referencia a tabela Categoria
    categoria_id = db.Column(db.Integer, db.ForeignKey('db_categoria.id'), nullable=False)

    def __repr__(self):
        return f'<Subcategoria {self.nome} (Categoria: {self.categoria_id})>'
