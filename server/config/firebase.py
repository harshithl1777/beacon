import json
import os
from pathlib import Path


def instantiate_firebase_config():
    filename = (
        "./config/firebase_config.json"
        if os.getenv("FLASK_ENV") == "development"
        else "./server/config/firebase_config.json"
    )
    file = Path(filename)
    file.touch(exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        firebase_config = {
            "type": os.getenv("FIREBASE_TYPE"),
            "project_id": os.getenv("FIREBASE_PROJECT_ID"),
            "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
            "private_key": os.getenv("FIREBASE_PRIVATE_KEY"),
            "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
            "client_id": os.getenv("FIREBASE_CLIENT_ID"),
            "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
            "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
            "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
            "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL"),
        }
        json.dump(firebase_config, f, ensure_ascii=False, indent=4)
