import React from 'react';
import cn from 'classnames';

import './DeleteListPopup.scss'
import {useHistory} from "react-router";

const DeleteListPopup = ({visible, setVisiblePopup, toBeDeleted, onDeleteList, setToBeDeleted, activeId}) => {
    let history = useHistory();
const {id, name} = toBeDeleted;
    const onConfirm = () => {
        onDeleteList(id);
        setToBeDeleted('');
        setVisiblePopup(false);
        activeId > 1 && activeId === id && history.push(`/${Number(activeId) - 1}`)
    };

    return (
        <div className={cn("delete-popup", {"visible" : visible})}>
            <div className="delete-popup__content">
                <h3 className="delete-popup__title">delete</h3>
                <p className="delete-popup__confirm">{`Are you sure you want to delete "${name}"?`}</p>
                <button className="button delete-popup__button--brown" onClick={() => setVisiblePopup(false)}>Close</button>
                <button className="button delete-popup__button--orange" onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    )
};


export default DeleteListPopup;