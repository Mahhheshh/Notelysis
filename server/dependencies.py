from typing import Annotated

from fastapi import HTTPException, Depends, Header
import jwt
from sqlalchemy.orm import Session

from database import databse, crud, schemas
from security import SECRET_KEY, ALGORITHM


def get_db():
    db = databse.SessionLocal()
    try:
        yield db
    finally:
        db.close()

SessionDep = Annotated[Session, Depends(get_db)]

def get_request_user(token: Annotated[str, Header()], db: SessionDep) -> schemas.User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = crud.get_user_by_id(db, user_id)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

RequestUserDep = Annotated[schemas.User, Depends(get_request_user)]