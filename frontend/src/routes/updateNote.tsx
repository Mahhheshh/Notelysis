import { useState } from "react";
import { useLocation } from "react-router-dom";

import { updateNote } from "../fetch";

export function UpdateNote() {
  const state = useLocation().state || "";
  const id = state.noteId || null;
  const [content, setContent] = useState(state.noteContent);

  if (!id && !state) {
    return <h1>Cannot update the Note..</h1>;
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    event.preventDefault();

    const target = event.target as HTMLButtonElement;
    target.innerText = "Updating....";
    target.disabled = true;

    setTimeout(() => {
      target.innerText = "Update Note";
      target.disabled = false;
    }, 2000);

    if (!id) {
      return;
    }
    const resp = await updateNote(id, content);
    // TODO: Show a toast about following
    if (!resp.ok) {
      return; // failed to update note
    }
    return; // note updated
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Update Note</h2>
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
                disabled={state.noteContent === content}
                type="submit"
                className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white shadow-md hover:bg-green-600  disabled:bg-gray-600"
              >
                Update Note
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
