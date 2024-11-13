try:
    from collections.abc import Iterable
except ImportError:
    from collections import Iterable

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
