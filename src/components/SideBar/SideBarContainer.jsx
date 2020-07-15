import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useHistory, withRouter} from "react-router";
import {compose} from "redux";
import {
    deleteList,
    editListName,
    onAddList,
    onChangeListName,
    onDeleteList,
    setActiveId,
    setEditModeOff,
    setEditModeOn
} from "../../redux/lists-reducer";

import SideBar from "./SideBar";

const SideBarContainer = ({lists, activeId, setActiveId, onAddList, setEditModeOn, setEditModeOff, editListName, onDeleteList, deleteList, onChangeListName}) => {
    let history = useHistory();
    let listId = history.location.pathname.split('/')[1];
    useEffect(() => {
        setActiveId(listId)
    }, [listId]);
    let newId;
    lists.length > 0 ? newId = `${Number(lists[lists.length - 1].id) + 1}` : newId = '1';
    return <SideBar lists={lists} onAddList={onAddList} newId={newId} activeId={activeId}
                    setEditModeOn={setEditModeOn} setEditModeOff={setEditModeOff} onChangeListName={onChangeListName}
                    editListName={editListName} onDeleteList={onDeleteList} deleteList={deleteList} setActiveId={setActiveId}/>
};


const mapStateToProps = state => ({
    lists: state.lists.lists,
    activeId: state.lists.activeId
});

export default compose(connect(mapStateToProps, {setActiveId, onAddList, editListName, setEditModeOn, setEditModeOff, onDeleteList, deleteList, onChangeListName}), withRouter)(SideBarContainer);