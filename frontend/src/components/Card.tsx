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
    e.stopPropagation();
    navigate(`/note/${props.id}`);
  }

  function navigateToUpdate(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/update/`, { state: {noteId: props.id, noteContent: props.title}});
  }

  return (
    <article
      onClick={handleSelect}
      className="ease-out duration-150 bg-white shadow-lg rounded-lg p-6 mb-6 flex items-center justify-between"
      style={{cursor: "pointer"}}
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-2">{props.title.length > 15 ? props.title.substring(0, 15) : props.title}</h3>
        {/* <p className="text-gray-700">
          Content from the Note....
        </p> */}
      </div>
      <div className="flex items-center">
        <img onClick={navigateToUpdate} className="w-5" src="edit.svg">
        </img>
        <img onClick={handleDelete} className="w-5 ml-5" src="delete.svg">
        </img>
      </div>
    </article>

  );
}
