from flask import make_response, Response


def create_response(payload='OK', success: bool = True, code: int = 200) -> Response:
    body = {
        'payload': payload,
        'success': success,
    }
    return make_response(body, code)
