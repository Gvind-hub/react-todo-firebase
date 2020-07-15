import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useHistory, withRouter} from "react-router";
import {compose} from "redux";

import NoteBar from "./NoteBar";
import {
    editTaskName,
    editTaskNotes,
    onAddTaskNotes,
    onChangeTaskName,
    onDeleteTaskNote,
    onEditTaskNote,
    toggleTaskCompleted
} from "../../redux/lists-reducer";

const NoteBarContainer = ({lists, activeId, onAddTaskNotes, onDeleteTaskNote, editTaskName, editTaskNotes, toggleTaskCompleted, onChangeTaskName, onEditTaskNote}) => {

    const [noteText, setNoteText] = useState('');
    const [taskName, setTaskName] = useState('');
    const [noteIndex, setNoteIndex] = useState('');
    let history = useHistory();

    useEffect(() => {
        task && task.text && setTaskName(task.text)
    }, []);

    useEffect(() => {
        setNoteText('');
        setNoteIndex('');
        task && task.text && setTaskName(task.text)
    }, [history.location.pathname]);

    let taskIndex = history.location.pathname.split('/')[2];
    let list = lists.find(list => list.id === activeId);
    let task;
    if (list && list.tasks && taskIndex) (task = list.tasks[taskIndex]);

    return <NoteBar noteIndex={noteIndex} onAddTaskNotes={onAddTaskNotes} onDeleteTaskNote={onDeleteTaskNote} setNoteIndex={setNoteIndex} taskName={taskName} setTaskName={setTaskName} onChangeTaskName={onChangeTaskName} noteText={noteText} setNoteText={setNoteText}
                    toggleTaskCompleted={toggleTaskCompleted} list={list} task={task}
                    activeId={activeId} taskIndex={taskIndex} editTaskNotes={editTaskNotes} editTaskName={editTaskName}
                    onEditTaskNote={onEditTaskNote}/>
};

const mapStateToProps = (state) => ({
    lists: state.lists.lists,
    activeId: state.lists.activeId
});


export default compose(connect(mapStateToProps, {
    editTaskName,
    editTaskNotes,
    toggleTaskCompleted,
    onChangeTaskName,
    onEditTaskNote,
    onAddTaskNotes,
    onDeleteTaskNote
}), withRouter)(NoteBarContainer);