from backend.app import ma
from backend.app.models.lancamento import Lancamento
from marshmallow import fields

class LancamentoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Lancamento
        include_fk = True

    categoria = fields.Nested('CategoriaSchema', only=["id", "nome"])
    conta_bancaria = fields.Nested('ContaBancariaSchema', only=["id", "nome"])
    centro_custo = fields.Nested('CentroCustoSchema', only=["id", "nome"])

lancamento_schema = LancamentoSchema()
lancamentos_schema = LancamentoSchema(many=True)
