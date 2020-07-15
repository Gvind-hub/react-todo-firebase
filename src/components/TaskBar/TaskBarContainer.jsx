import React from 'react';
import {connect} from "react-redux";

import TaskBar from "./TaskBar";
import {onAddTask, toggleTaskCompleted, addTask, onDeleteTask} from "../../redux/lists-reducer";

const TaskBarContainer = ({lists, activeId, toggleTaskCompleted, onAddTask, addTask, onDeleteTask}) => {

    return <TaskBar list={lists.find(list => list.id === activeId)} onDeleteTask={onDeleteTask} lists={lists} addTask={addTask} onAddTask={onAddTask} toggleTaskCompleted={toggleTaskCompleted}/>
};

const mapStateToProps = (state) => ({
    lists: state.lists.lists,
    activeId: state.lists.activeId
});


export default connect(mapStateToProps, {toggleTaskCompleted, onAddTask, addTask, onDeleteTask})(TaskBarContainer);