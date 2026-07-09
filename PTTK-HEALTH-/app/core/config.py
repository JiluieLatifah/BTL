from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str
    API_V1_STR: str
    
    DB_SERVER: str
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_PORT: int

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_SERVER}:{self.DB_PORT}/{self.DB_NAME}"

    # Cấu hình tự động đọc từ file .env
    model_config = ConfigDict(env_file=".env", case_sensitive=True)

# 💡 ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT MÀ HỆ THỐNG ĐANG BÁO THIẾU:
settings = Settings()