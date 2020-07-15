import React, {useState} from 'react';

import './TaskBar.scss'
import Task from "./Task/Task";



const TaskBar = ({list, toggleTaskCompleted, onAddTask, onDeleteTask}) => {
    const [taskName, setTaskName] = useState('');

    if (list) {
        const handleClickAdd = () => {
            taskName && onAddTask(list.id, taskName, list);
            setTaskName('')
        };
        return (
            <section className="task-bar">
                <h2 className="task-bar__list-title">{list.name}</h2>
                <div className="task-bar__content">
                    <div className="task-bar__new-task">
                        <input type="text" className="task-bar__task-input" placeholder="Task Name" value={taskName}
                               onChange={e => setTaskName(e.target.value)}
                               onKeyDown={e => e.key === 'Enter' && taskName && handleClickAdd()}/>
                        <ion-icon className="task-bar__add-icon" name="add-outline" onClick={handleClickAdd}/>
                    </div>
                   <Task list={list} toggleTaskCompleted={toggleTaskCompleted} onDeleteTask={onDeleteTask}/>
                </div>
            </section>
        )
    }
    return (
        <div className="task-bar">
        </div>
    )
};


export default TaskBar;