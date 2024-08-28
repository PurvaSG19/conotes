import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoteDetails(props) {
  const { notes, onEditNote, onDeleteNote } = props; 
  const navigate = useNavigate();

  const handleEditClick = (note) => {
    onEditNote(note._id, note.title, note.subject, note.content); 
    navigate("/add"); 
  };

  return (
    <div>
      <ul className='flex flex-col gap-5 w-30'>
        {notes.map((note, noteIndex) => (
          <li key={noteIndex} className='flex bg-lime-200 p-5 w-30 rounded-md grid-cols-3'>
            <div className='flex flex-col gap-2  grid-cols-3 w-30'>
              <h3 className='text-2xl font-semibold mb-0'>{note.title}</h3>
              {note.subject && <h6 className='bg-gray-300 w-min rounded-lg px-2 text-gray-600 mb-3'>{note.subject}</h6>} 
              <p>{note.content}</p>
              <div className='flex gap-2'>
                <button onClick={() => handleEditClick(note)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => onDeleteNote(note._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
