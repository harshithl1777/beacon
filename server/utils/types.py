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


class AnyFilters(Enum):
    ANY_DISTANCE = "ANY_DISTANCE"
    ANY_WAIT_TIME = "ANY_WAIT_TIME"
    ANY_RATING = "ANY_RATING"


class LineWaitTime(Enum):
    VALUES = [
        "NO_WAIT",
        "5_TO_10",
        "10_TO_20",
        "20_TO_40",
        "40_TO_60",
        "MORE_THAN_60",
    ]
