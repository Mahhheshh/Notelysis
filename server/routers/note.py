from fastapi import APIRouter

from dependencies import SessionDep, RequestUserDep
from database import crud, schemas

note_router = APIRouter(
        prefix="/note",
    )

@note_router.get("/")
def get_notes(user: RequestUserDep, db: SessionDep):
    notes = crud.get_notes(db, user.id)
    return notes

@note_router.get("/{note_id}")
def get_note_by_id(note_id: str, user: RequestUserDep, db: SessionDep):
    note = crud.get_note_by_id(db, note_id)
    if not note:
        return {"message": "Note not found"}
    if note.user_id != user.id:
        return {"message": "Unauthorized"}
    return note

@note_router.post("/new")
def new_note(note: schemas.NoteBase, user: RequestUserDep, db: SessionDep):
    note = crud.create_note(db, note, user.id)
    return note

@note_router.put("/update")
def update_note(note: schemas.NoteUpdate, user: RequestUserDep, db: SessionDep): 
    crud.update_note(db, user.id, note.id, note.content)
    return {"Message": "Note Updated!"}

@note_router.delete("/delete/{note_id}")
def delete_note(note_id: int, user: RequestUserDep, db: SessionDep):
    note = crud.get_note_by_id(db, note_id)
    if not note:
        return {"message": "Note not found"}
    if note.user_id != user.id:
        return {"message": "Unauthorized"}
    db.delete(note)
    db.commit()
    return {"message": "Note deleted"}