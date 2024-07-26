import { useEffect, useState } from "react";
import { useIsLogged } from "./hooks/useIsLogged";

import { Card } from "./components/Card";

import { fetchNotes } from "./fetch";

export type Note = {
  id: number;
  content: string
};

export function App() {
  const { isLogged } = useIsLogged();
  const [notes, setNotes] = useState<Note[]>([]);
  
  useEffect(() => {
    if (!isLogged) {
      return;
    }

    const notes = fetchNotes();
    notes.then((data) => setNotes(data));
  }, [isLogged]);

  if (!isLogged) {
    return null;
  }

  function deleteNote(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        {notes && notes.length > 0
          ? notes.map((note) => {
              return (
                <Card
                  key={note.id}
                  title={note.content}
                  id={note.id}
                  updateNoteList={deleteNote}
                />
              );
            })
          : null}
      </section>
    </main>
  );
}
