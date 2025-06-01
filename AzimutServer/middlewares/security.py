from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from urllib.parse import unquote
import re


## Create a global middleware to to sanitize incoming requests and protect against XSS (Cross-Site Scripting) and malformed query strings 
class SanitizeQueryMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Sanitize query parameters
        clean_query = {}
        for key, value in request.query_params.items():
            decoded = unquote(value)
            # Basic XSS sanitization: remove <script>, on* handlers, etc.
            sanitized = re.sub(r"(?i)<script.*?>.*?</script>", "", decoded)
            sanitized = re.sub(r'(?i)on\w+=".*?"', "", sanitized)
            clean_query[key] = sanitized

        # Rebuild scope with sanitized query
        request.scope["query_string"] = "&".join(
            f"{k}={v}" for k, v in clean_query.items()
        ).encode()

        return await call_next(request)
