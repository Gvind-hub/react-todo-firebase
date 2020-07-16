import React from 'react';
import cn from 'classnames';

import './List.scss'
import {NavLink} from "react-router-dom";


const List = ({lists, editListName, onChangeListName, setEditModeOn, onClickDelete}) => {
    return (
        <ul className="lists">
            {lists.length !== 0 && lists.map(list => (
                <li className="lists__list" key={list.id} >
                    <NavLink to={`/${list.id}`} className="lists__link">
                        <div className="lists__info">
                            {!list.editMode && <div className={cn("lists__list-name", {"scratched" : list.tasks && list.tasks.length > 0 && list.tasks.length === list.tasks.filter(task => task.completed).length})}>{list.name}</div>}
                            {list.editMode && <input type="text" className="lists__input" minLength="1" maxLength="20"
                                                     value={list.name} onChange={e => editListName(list.id, e.target.value)}
                                                     onBlur={() => list.name && onChangeListName(list.id, list.name)} onKeyDown={e => e.key === 'Enter' && list.name && onChangeListName(list.id, list.name)}/>}
                            <div className="lists__details">
                                <div className="lists__tasks-amount">total: {list.tasks ? list.tasks.length : 0}</div>
                                <div className="lists__tasks-completed">completed: {list.tasks ? list.tasks.filter(task => task.completed).length : "0"}</div>
                            </div>
                        </div>
                    </NavLink>
                    <div className="lists__icons">
                        <ion-icon className="lists__icon-edit" name="create-outline" onClick={() => setEditModeOn(list.id)}/>
                        <ion-icon className="lists__icon-delete" name="close-outline" onClick={() => onClickDelete(list.id, list.name)} />
                    </div>
                </li>

            ))}
        </ul>
    )
};


export default List;