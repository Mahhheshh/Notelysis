from pydantic import BaseModel

class NoteBase(BaseModel):
    title: str
    content: str | None = None

class NoteCreate(NoteBase):
    title: str | None = None

class Note(NoteBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    hashed_password: str
    notes: list[Note]

    class Config:
        from_attributes = True