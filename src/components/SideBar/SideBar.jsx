import React, {useState} from 'react';

import './SideBar.scss'
import AddNewListPopup from "./AddNewListPopup/AddNewListPopup";
import DeleteListPopup from "./DeleteListPopup/DeleteListPopup";
import List from "./List/List";



const SideBar = ({setActiveId, activeId, lists, onAddList, newId, editListName, setEditModeOn, onDeleteList, onChangeListName}) => {
    const [visibleAddListPopup, setVisibleAddListPopup] = useState(false);
    const [visibleDeleteListPopup, setVisibleDeleteListPopup] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState('');

    const onClickDelete = (id, name) => {
        setVisibleDeleteListPopup(true);
        setToBeDeleted({id: id, name: name});
    };


    return (
        <section className="side-bar">
            <div className="side-bar__title-block">
                <h2 className="side-bar__title">Task Lists</h2>
                <ion-icon className="side-bar__add-icon" name="add-outline" onClick={() => setVisibleAddListPopup(true)}/>
            </div>
            <div className="side-bar__lists">
                <List lists={lists} editListName={editListName} onChangeListName={onChangeListName}
                      setEditModeOn={setEditModeOn} onClickDelete={onClickDelete}/>
            </div>
            <AddNewListPopup visible={visibleAddListPopup} setVisiblePopup={setVisibleAddListPopup} onAddList={onAddList} newId={newId}/>
            <DeleteListPopup setActiveId={setActiveId} activeId={activeId} visible={visibleDeleteListPopup} setVisiblePopup={setVisibleDeleteListPopup} toBeDeleted={toBeDeleted} onDeleteList={onDeleteList} setToBeDeleted={setToBeDeleted}/>
        </section>
    )
};


export default SideBar;