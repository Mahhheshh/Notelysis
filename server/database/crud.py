from sqlalchemy.orm import Session

from . import models, schemas

def get_user_by_id(db: Session, user_id: int) -> schemas.User:
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str)-> schemas.User:
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> schemas.User:
    db_user = models.User(email=user.email, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_notes(db: Session, user_id: int) -> list[schemas.Note]:
    return db.query(models.Note).filter(models.Note.user_id == user_id).order_by(models.Note.id.desc()).all()

def get_note_by_id(db: Session, note_id: int) -> schemas.Note:
    return db.query(models.Note).filter(models.Note.id == note_id).first()

def create_note(db: Session, note: schemas.NoteBase, user_id: int) -> schemas.Note:
    db_note = models.Note(**note.model_dump(), user_id=user_id)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def update_note(db: Session, user_id: int, note_id: int, new_content: str) -> schemas.Note:
    db_note = db.query(models.Note).filter(models.Note.id == note_id, models.Note.user_id == user_id)

    if db_note is None:
        return 

    db_note.update({"content": new_content})
    db.commit()