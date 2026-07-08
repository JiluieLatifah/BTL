from fastapi import FastAPI

app = FastAPI(title="BTL API")

@app.get("/")
def read_root():
    return {"message": "Hello World"}