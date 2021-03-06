import React from 'react';
import {NavLink} from "react-router-dom";

import './Task.scss'


const Task = ({list, toggleTaskCompleted, onDeleteTask}) => {

    return (
        <div className="task">
            <div className="task__content">
                {list.tasks && list.tasks.map((task, index) => (
                    <div className="task__element" key={index}>
                        <div className="checkbox">
                            <input id={`task-${index}`} type="checkbox"
                                   onChange={() => toggleTaskCompleted(list.id, index, list)} checked={task.completed}/>
                            <label htmlFor={`task-${index}`}>
                                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </label>
                        </div>
                        <NavLink to={`/${list.id}/${index}`} className="task__link">
                            <span className="task__name">{task.text}</span>
                        </NavLink>
                        <ion-icon className="task__icon-delete" name="close-outline" onClick={() => onDeleteTask(list.id, index, list)}/>
                    </div>
                ))}
            </div>
        </div>
    )
};


export default Task;