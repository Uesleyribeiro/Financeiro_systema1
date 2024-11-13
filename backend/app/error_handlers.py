from flask import jsonify
from werkzeug.exceptions import HTTPException

def register_error_handlers(app):
    @app.errorhandler(HTTPException)
    def handle_exception(e):
        """Return JSON instead of HTML for HTTP errors."""
        response = e.get_response()
        response.data = jsonify({
            "code": e.code,
            "name": e.name,
            "description": e.description,
        })
        response.content_type = "application/json"
        return response

    @app.errorhandler(Exception)
    def handle_unexpected_error(e):
        """Handle unexpected errors."""
        app.logger.error('An unexpected error has occurred.', exc_info=e)
        response = jsonify({
            "code": 500,
            "name": "Internal Server Error",
            "description": "An unexpected error occurred."
        })
        response.status_code = 500
        return response
