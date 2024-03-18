import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchNoteById } from "../fetch";

export function NoteView() {
  const [noteContent, setNoteContent] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error("Note ID is required");
  }

  const idAsNumber = parseInt(id, 10);
  useEffect(() => {
    if (isNaN(idAsNumber)) {
      throw new Error("Invalid note ID");
    }

    console.log(`Fetching note with ID: ${idAsNumber}`);
    fetchNoteById(idAsNumber).then((data) => {
      if (data) {
        setNoteContent(data.content);
      }
    });
  }, [idAsNumber, setNoteContent]);

  return (
    <div className="container mx-auto px-4 py-8 ">

    <section className="mb-8">
      <div className="bg-gradient-to-r from-green-100 to-blue-100 shadow-lg rounded-lg p-6">
        {/* <h3 className="text-xl font-bold mb-4">Designing User Flows</h3> */}
        <p className="text-gray-700">
            {noteContent}  
        </p>
      </div>
    </section>
    </div>
  );
}
