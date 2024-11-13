from backend.app import ma
from backend.app.models.categoria import Categoria

class CategoriaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Categoria

categoria_schema = CategoriaSchema()
categorias_schema = CategoriaSchema(many=True)
