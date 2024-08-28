const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// //Middleware
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

//Connect to MongoDB Compass
mongoose.connect(MONGOURL).then(() => {
    console.log("Database is connected successfully!!");
    app.listen(PORT,() => {
        console.log(`Sever is running on port: ${PORT}`);
    });
}).catch((error) => {console.log("Error in connecting to database",error)});

console.log("MongoDB URL: ", process.env.MONGO_URL);

const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    content: String
  });
  
const Note = mongoose.model('notes', noteSchema);


app.get("/api/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Note by ID
app.put("/api/notes/:id", async (req, res) => {
    const { title, subject, content } = req.body;
    const noteId = req.params.id;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, subject, content },
            { new: true }
        );
        res.json(updatedNote);
    } catch (error) {
        res.status(404).json({ message: "Note not found" });
    }
});

// Delete Note by ID
app.delete("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id;

    try {
        await Note.findByIdAndDelete(noteId);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Note not found" });
    }
});

app.post("/api/notes", async (req, res) => {
    const { title,subject, content } = req.body;

    const note = new Note({ title,subject, content });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
