from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Health Agent Orchestra"
    API_V1_STR: str = "/api/v1"
    
    # Supabase
    SUPABASE_URL: str
    SUPABASE_KEY: str
    
    # OpenAI
    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-4o"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
