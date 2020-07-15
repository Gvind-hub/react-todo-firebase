import React from 'react';
import cn from 'classnames';

import './Note.scss'


const Note = ({
                  list, task, noteIndex, onAddTaskNotes, onDeleteTaskNote, setNoteIndex, taskIndex,
                  onEditTaskNote, activeId, noteText, setNoteText
              }) => {
    const handleSaveNote = () => {
        noteText && onEditTaskNote(activeId, Number(taskIndex), list, noteIndex, noteText)
    };

    const handleAddNote = () => {
        onAddTaskNotes(activeId, Number(taskIndex), list);
        task.notes && setNoteIndex(task.notes.length);
        setNoteText('New Note')
    };

    const handleDeleteNote = () => {
        onDeleteTaskNote(activeId, Number(taskIndex), list, noteIndex);
        setNoteIndex(noteIndex - 1);
        setNoteText(task.notes[noteIndex - 1])
    };

    return (
        <div className="note">
            <div className="note__title-block">
                <h2 className="title note__title">notes</h2>
            </div>
            {task.notes && <ul className="note__list">
                {task.notes.map((note, index) => (
                    <li className={cn("note__element", {"active": index === noteIndex})} key={index} onClick={() => {
                        setNoteText(note);
                        setNoteIndex(index)
                    }}>{index + 1}. {note}</li>
                ))}
            </ul>}
            <div className="note__add-button-block">
                <button className="button note__button--brown" onClick={handleAddNote}>Add</button>
            </div>
            <div className={cn("note__text-block", {"visible": task.notes && task.notes[noteIndex]})}>
                <p className="note__note-info">{task.notes ? `Note #${noteIndex + 1}` : null}</p>
                <textarea className="note__notes-text" placeholder="Notes" rows="4" value={noteText}
                          onChange={e => setNoteText(e.target.value)}/>
                <div className="note__buttons">
                    <button className="button note__button--brown" onClick={handleDeleteNote}>Delete</button>
                    <button className="button note__button--orange" onClick={handleSaveNote}>Save</button>
                </div>
            </div>
        </div>
    )
};


export default Note;