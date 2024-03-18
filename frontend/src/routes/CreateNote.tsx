import { useState } from "react";
import { createNote } from "../fetch";


export function CreateNote() {
  const [content, setContent] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const note = createNote(content);
    note.then((data) => {
      if (!data) {
        return;
      }
      setContent("");
    })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Create New Note</h2>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <form>
            <div className="mb-6">
              <textarea
                value={content}
                onChange={handleChange}
                id="content"
                name="content"
                className="h-48 w-full rounded-lg border px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter note content"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                type="submit"
                className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white shadow-md hover:bg-green-600"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
