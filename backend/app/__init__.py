from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config
import logging
from logging.handlers import RotatingFileHandler
import os


db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    from .error_handlers import register_error_handlers
    register_error_handlers(app)

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    jwt.init_app(app)
    CORS(app)

    from .routes import (
        lancamentos,
        categorias,
        relatorios,
        extratos,
        centros_custo,
        dashboard,
        orcamento,
        auth
    )

    app.register_blueprint(lancamentos.bp)
    app.register_blueprint(categorias.bp)
    app.register_blueprint(relatorios.bp)
    app.register_blueprint(extratos.bp)
    app.register_blueprint(centros_custo.bp)
    app.register_blueprint(dashboard.bp)
    app.register_blueprint(orcamento.bp)
    app.register_blueprint(auth.bp)

    @app.route('/')
    def home():
        return "Bem-vindo ao Sistema Financeiro"

    # Configuração de logging
    if not app.debug and not app.testing:
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/financeiro.log', maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('Financeiro startup')

    return app
