from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from typing import List


# Create middleware that ensures querystring is empty for some paths 
class EnforceNoQueryMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, protected_paths: List[str]):
        super().__init__(app)
        self.protected_paths = protected_paths

    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        if path in self.protected_paths and request.query_params:
            return JSONResponse(
                status_code=400,
                content={"detail": "Query parameters are not allowed on this endpoint."},
            )
        return await call_next(request)