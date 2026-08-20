import bcrypt
import hashlib


def _prepare_password(password: str) -> bytes:
    # Convert password to a fixed-length SHA-256 digest
    # before bcrypt, so bcrypt's 72-byte limit is not an issue.
    return hashlib.sha256(password.encode("utf-8")).digest()


def hash_password(password: str) -> str:
    password_bytes = _prepare_password(password)

    hashed = bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt()
    )

    return hashed.decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
    password_bytes = _prepare_password(password)

    return bcrypt.checkpw(
        password_bytes,
        hashed_password.encode("utf-8")
    )