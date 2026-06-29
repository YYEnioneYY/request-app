from collections import defaultdict, deque
from time import time

from fastapi import HTTPException, status

from app.core.config import settings


class LoginRateLimiter:
    def __init__(self):
        self.failed_attempts: dict[str, deque[float]] = defaultdict(deque)

    def check(self, key: str) -> None:
        now = time()
        attempts = self.failed_attempts[key]

        self._remove_old_attempts(attempts, now)

        if len(attempts) >= settings.LOGIN_RATE_LIMIT_ATTEMPTS:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Слишком много попыток входа. Попробуйте позже.",
            )

    def add_failed_attempt(self, key: str) -> None:
        now = time()
        attempts = self.failed_attempts[key]

        self._remove_old_attempts(attempts, now)
        attempts.append(now)

    def clear(self, key: str) -> None:
        self.failed_attempts.pop(key, None)

    def _remove_old_attempts(self, attempts: deque[float], now: float) -> None:
        while attempts and now - attempts[0] > settings.LOGIN_RATE_LIMIT_SECONDS:
            attempts.popleft()


login_rate_limiter = LoginRateLimiter()