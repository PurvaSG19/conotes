import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from "react-router-dom"; 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";

export default function Create(props) {
  const { title, setTitle, subject, setSubject, content, setContent, onAddNote, editingNoteId } = props;
  const navigate = useNavigate(); 

  //copy to clipboard
  const [ textToCopy,setTextToCopy ] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy);

  // transcribing speech
  const { transcript, browserSupportsSpeechRecognition, listening } = useSpeechRecognition();

  // Logging transcript to see if it updates
  useEffect(() => {
    console.log("Transcript:", transcript);
    setTextToCopy(transcript); 
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const stopListening = () => SpeechRecognition.stopListening();

  useEffect(() => {
    if (editingNoteId) {
      setTitle(title);
      setSubject(subject);
      setContent(content);
    }
  }, [editingNoteId, setTitle, setSubject, setContent, title, subject, content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !subject) {
      alert("Please fill in all fields");
      return;
    }
    onAddNote();  
    navigate("/");  
  };

  return (
    <div className='flex flex-col gap-4 mx-auto w-full mb-5'>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-4 mb-5'>
          <label>Title: </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='p-3 border-lime-600 border-[1px] rounded-md focus:outline-none border-solid'
          />
          <label>Subject: </label>
          <input
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className='p-3 border-lime-600 border-[1px] rounded-md focus:outline-none border-solid'
          />
        </div>

        <div className='flex flex-col gap-4 mb-5'>
          <label>Content: </label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='p-3 border-lime-600 border-[1px] rounded-md focus:outline-none border-solid'
          />
        </div>

        {/* speech to text functionality */}
        <h5 className='mx-auto text-center'>Bored of typing lengthy notes? Try our speech-to-text feature!</h5>

        <div className='h-auto w-auto bg-slate-100 p-3 mb-4 rounded-md'>
          {/* Transcribed text */}
          <p>{transcript}</p>
          
        </div>

        <div className='flex gap-4 items-center text-center justify-center mb-5'>
        <button onClick={setCopied} className='bg-lime-600 text-white p-2 rounded-md duration-200 hover:bg-lime-500' type='button'>{isCopied ? "Copied!" : "Copy"}</button>
          <button onClick={startListening} className='bg-lime-600 text-white p-2 rounded-md duration-200 hover:bg-lime-500' type='button'>Start Listening</button>
          <button onClick={stopListening} className='bg-lime-600 text-white p-2 rounded-md duration-200 hover:bg-lime-500' type='button'>Stop Listening</button>
        </div>

        <div className='bg-gray-400 h-0.5 rounded-md font-extralight w-full mx-auto mb-2'></div>
        <Button text={props.editingNoteId ? 'Update' : 'Add'} func={handleSubmit} />
      </form>
    </div>
  );
}
