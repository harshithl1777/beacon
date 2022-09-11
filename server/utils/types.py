from enum import Enum


from enum import Enum


class AuthMethod(Enum):
    CREDENTIALS = "CREDENTIALS"
    GOOGLE = "GOOGLE"
    FACEBOOK = "FACEBOOK"
    GITHUB = "GITHUB"


class Token(Enum):
    ACCESS = "ACCESS"
    REFRESH = "REFRESH"


class Target(Enum):
    PRODUCTS = "PRODUCTS"
    LINE = "LINE"
    REVIEWS = "REVIEWS"


class Distance(Enum):
    ANY = "ANY"
