import React from 'react';

import './NoteBar.scss'
import Note from "./Note/Note";


const NoteBar = ({
                     list, task, noteIndex, onAddTaskNotes, onDeleteTaskNote, setNoteIndex, taskIndex, taskName,
                     setTaskName, onChangeTaskName, onEditTaskNote, activeId, noteText, setNoteText, toggleTaskCompleted
                 }) => {

        if (task) {
        const handleSaveName = () => {
            onChangeTaskName(activeId, Number(taskIndex), list, {text: taskName}, taskName)
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
                    <Note list={list} task={task} activeId={activeId} noteIndex={noteIndex} noteText={noteText}
                    onAddTaskNotes={onAddTaskNotes} onDeleteTaskNote={onDeleteTaskNote} onEditTaskNote={onEditTaskNote}
                          setNoteIndex={setNoteIndex} setNoteText={setNoteText} taskIndex={taskIndex}/>
                </div>
            </section>
        )
    } else {
        return (
            <div className="note-bar">
            </div>
        )
    }

};


export default NoteBar;