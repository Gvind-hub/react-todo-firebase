import React, {useRef} from 'react';
import cn from 'classnames';

import './NoteBar.scss'


const NoteBar = ({
                     list, task, noteIndex, onAddTaskNotes, onDeleteTaskNote, setNoteIndex, taskIndex, taskName,
                     setTaskName, onChangeTaskName, onEditTaskNote, activeId, noteText, setNoteText, toggleTaskCompleted
                 }) => {

        if (task) {
        const handleSaveName = () => {
            onChangeTaskName(activeId, Number(taskIndex), list, {text: taskName}, taskName)
        };

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
            <section className="note-bar">
                <div className="note-bar__content">
                    <h2 className="title note-bar__title">info</h2>
                    <div className="note-bar__task">
                        <div className="checkbox">
                            <input id={`task-${taskIndex}`} type="checkbox" checked={task.completed}
                                   onChange={() => toggleTaskCompleted(list.id, taskIndex, list)}/>
                            <label htmlFor={`task-${taskIndex}`}>
                                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </label>
                        </div>
                        <input type="text" className="note-bar__task-name" placeholder="Task Name" value={taskName}
                               onChange={e => setTaskName(e.target.value)}
                               onKeyDown={e => e.key === 'Enter' && handleSaveName()}/>
                        <ion-icon className="note-bar__name-submit" name="enter-outline" onClick={handleSaveName}/>
                    </div>
                    <div className="note">
                        <div className="note__title-block">
                            <h2 className="title note__title">notes</h2>
                        </div>
                        {task.notes && <ul className="note__list">
                            {task.notes.map((note, index) => (
                                <li className={cn("note__element", {"active": index === noteIndex})} key={index} onClick={() => {
                                    setNoteText(note);
                                    setNoteIndex(index)
                                }} >{index + 1}. {note}</li>
                            ))}
                        </ul>}
                    </div>
                    <div className="note-bar__add-button-block">
                        <button className="button note-bar__button--brown" onClick={handleAddNote}>Add</button>
                    </div>
                    <div className={cn("note-bar__text-block", {"visible": task.notes && task.notes[noteIndex]})}>
                        <p className="note-bar__note-info">{task.notes ? `Note #${noteIndex + 1}` : null}</p>
                        <textarea className="note-bar__notes-text" placeholder="Notes" rows="4" value={noteText}
                                  onChange={e => setNoteText(e.target.value)}/>
                        <div className="note-bar__buttons">
                            <button className="button note-bar__button--brown" onClick={handleDeleteNote}>Delete</button>
                            <button className="button note-bar__button--orange" onClick={handleSaveNote}>Save</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <div className="empty">
            </div>
        )
    }

};


export default NoteBar;