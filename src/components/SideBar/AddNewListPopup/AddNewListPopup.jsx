import React, {useState} from 'react';
import cn from 'classnames';

import './AddNewListPopup.scss'

const AddNewListPopup = ({visible, setVisiblePopup, onAddList, newId}) => {
    const [newListName, setNewListName] = useState('');
    const onClickAdd = () => {
        onAddList(newId, newListName);
        setVisiblePopup(false);
        setNewListName('')
    };
    return (
        <div className={cn("side-bar-popup", {"visible" : visible})}>
            <div className="side-bar-popup__content">
                <h3 className="side-bar-popup__title">new list</h3>
                <input type="text" className="side-bar-popup__input" minLength="1" maxLength="20"
                       value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="Enter the name"
                       onKeyDown={(e) => e.key === 'Enter' && onClickAdd()} autoFocus/>
                <button className="button side-bar-popup__button--brown" onClick={() => setVisiblePopup(false)}>Close</button>
                <button className="button side-bar-popup__button--orange" onClick={onClickAdd}>Add</button>
            </div>
        </div>
    )
};


export default AddNewListPopup;