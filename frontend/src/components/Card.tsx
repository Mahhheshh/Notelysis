import { useNavigate } from "react-router-dom";

import { deleteNote } from "../fetch";

export function Card(props: {
  title: string;
  id: number;
  updateNoteList: (id: number) => void;
}) {
  const navigate = useNavigate();

  function handleDelete(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    deleteNote(props.id);
    props.updateNoteList(props.id);
  }

  function handleSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    console.log(`Navigating to /note/${props.id}`);
    navigate(`/note/${props.id}`);
  }

  return (
    <article
      onClick={handleSelect}
      className="ease-out duration-150 bg-white shadow-lg rounded-lg p-6 mb-6 flex items-center justify-between"
      style={{cursor: "pointer"}}
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-2">{props.title}</h3>
        {/* <p className="text-gray-700">
          A guide to crafting seamless user journeys.
        </p> */}
      </div>
      <div className="flex items-center">
        <img onClick={handleDelete} className="w-5" src="delete.svg">
        </img>
      </div>
    </article>

  );
}
