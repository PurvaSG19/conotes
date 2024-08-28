import NavBar from "./components/NavBar";
import Create from "./screens/Create";
import NoteDetails from "./screens/NoteDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [editingNoteId, setEditingNoteId] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        axios
            .get("http://localhost:5000/api/notes")
            .then((response) => setNotes(response.data))
            .catch((error) => console.error("Error fetching notes:", error));
    };

    const handleAddNote = () => {
        if (editingNoteId) {
            // Edit existing note
            axios
                .put(`http://localhost:5000/api/notes/${editingNoteId}`, { title, subject, content })
                .then((response) => {
                    const updatedNotes = notes.map((note) =>
                        note._id === editingNoteId ? response.data : note
                    );
                    setNotes(updatedNotes); // Update the notes state
                    resetForm();
                    fetchNotes(); // Fetch the updated notes after editing
                })
                .catch((error) => console.error("Error updating note:", error));
        } else {
            // Add new note
            axios
                .post("http://localhost:5000/api/notes", { title, subject, content })
                .then((response) => {
                    setNotes([...notes, response.data]); // Add new note to state
                    resetForm();
                    fetchNotes(); // Fetch the updated notes after adding
                })
                .catch((error) => console.error("Error adding note:", error));
        }
    };

    const handleEditNote = (id, title, subject, content) => {
        setTitle(title);
        setSubject(subject);
        setContent(content);
        setEditingNoteId(id);  // Set the note ID being edited
    };

    const resetForm = () => {
        setTitle("");
        setSubject("");
        setContent("");
        setEditingNoteId(null);
    };

    const handleDeleteNote = (id) => {
        axios
            .delete(`http://localhost:5000/api/notes/${id}`)
            .then(() => {
                const updatedNotes = notes.filter((note) => note._id !== id);
                setNotes(updatedNotes); // Remove the deleted note from state
            })
            .catch((error) => console.error("Error deleting note:", error));
    };

    return (
        <main className="flex flex-col p-5 w-full mx-auto max-w-[900px]">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route
                        path="/add"
                        element={
                            <Create
                                title={title}
                                setTitle={setTitle}
                                subject={subject}
                                setSubject={setSubject}
                                content={content}
                                setContent={setContent}
                                onAddNote={handleAddNote}
                                editingNoteId={editingNoteId}
                            />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <NoteDetails
                                notes={notes}
                                onEditNote={handleEditNote}
                                onDeleteNote={handleDeleteNote}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
