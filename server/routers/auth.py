from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from database.schemas import UserCreate, User
from database.crud import get_user_by_email, create_user
from dependencies import SessionDep
from security import create_access_token, verify_password, get_password_hash

auth_router = APIRouter(prefix="/auth")

class Token(BaseModel):
    access_token: str
    token_type: str

@auth_router.post("/token")
def get_or_create_token(user: UserCreate, db: SessionDep):
    db_user = get_user_by_email(db, user.email)
    # 0 - login, 1 - register
    if db_user is None:
        user.password = get_password_hash(user.password)
        user: User = create_user(db, user)
        token = create_access_token(data={"sub": user.id})
    else:
        print(user.password, db_user.hashed_password, verify_password(user.password, db_user.hashed_password))
        if not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code=400, detail="Invalid credentials")
        token = create_access_token(data={"sub": db_user.id})
    
    return Token(access_token=token, token_type="bearer")