from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from routers.auth import auth_router
from routers.note import note_router

from database import models, databse


app = FastAPI(root_path="/api")

app.include_router(auth_router)
app.include_router(note_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.mount("/", StaticFiles(directory="../frontend/dist", html=True))

if __name__ == "__main__":
    import uvicorn
    models.Base.metadata.create_all(bind=databse.engine)
    uvicorn.run("main:app")