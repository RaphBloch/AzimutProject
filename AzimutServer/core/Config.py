import os

from dotenv import load_dotenv

from pydantic_settings import BaseSettings


load_dotenv()

class Settings(BaseSettings):
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PWD")
    DB_NAME : str = os.getenv("DB_NAME")
    DB_HOST : str  = os.getenv("DB_HOST", "localhost")
    DB_PORT: str = "5432"




