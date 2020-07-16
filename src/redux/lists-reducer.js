import {listsAPI} from "../api/api";
import {
    removeObjectFromArray,
    removeSubObjectFromArray,
    updateArray,
    updateObjectInArray,
    updateSubObjectInArray
} from "../components/Utils/object-helpers";
import {firestore} from 'firebase';

const ADD_LIST = 'ADD_LIST';
const SET_LISTS = 'GET_LISTS';
const IS_ACTIVE = 'IS_ACTIVE';
const EDIT_LIST_NAME = 'EDIT_LIST_NAME';
const EDIT_MODE_ON = 'EDIT_MODE_ON';
const EDIT_MODE_OFF = 'EDIT_MODE_OFF';
const DELETE_LIST = 'DELETE_LIST';
const SET_TASK_COMPLETED = 'SET_TASK_COMPLETED';
const SET_TASK_UNCOMPLETED = 'SET_TASK_UNCOMPLETED';
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK_NAME = 'EDIT_TASK_NAME';
const EDIT_TASK_NOTES = 'EDIT_TASK_NOTES';
const ADD_TASK_NOTES = 'ADD_TASK_NOTES';
const DELETE_TASK_NOTES = 'DELETE_TASK_NOTES';

let initialState = {
    lists: [],
};

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS: {
            return {...state, lists: [...state.lists, ...action.lists]};
        }
        case ADD_LIST: {
            const newList = {id: action.id, name: action.name, editMode: false};
            if (state.lists) {
                return {...state, lists: [...state.lists, newList]};
            } else {
                return {...state, lists: [newList]};
            }
        }
        case IS_ACTIVE: {
            return {...state, activeId: action.activeId};
        }
        case EDIT_LIST_NAME: {
            return {...state, lists: updateObjectInArray(state.lists, action.id, 'id', {name: action.name})};

        }
        case EDIT_MODE_ON: {
            return {
                ...state,
                lists: updateObjectInArray(state.lists, action.id, 'id', {editMode: true})
            };
        }
        case EDIT_MODE_OFF: {
            return {
                ...state,
                lists: updateObjectInArray(state.lists, action.id, 'id', {editMode: false})
            };
        }
        case DELETE_LIST: {
            return {
                ...state,
                lists: removeObjectFromArray(state.lists, action.id, 'id')
            }
        }
        case SET_TASK_COMPLETED: {
            return {
                ...state,
                lists: updateObjectInArray(state.lists, action.id, 'id', {
                    tasks: updateSubObjectInArray(state.lists[Number(action.id) - 1].tasks, action.index, {
                        completed: true
                    })
                })
            }
        }
        case SET_TASK_UNCOMPLETED: {
            return {
                ...state,
                lists: updateObjectInArray(state.lists, action.id, 'id', {
                    tasks: updateSubObjectInArray(state.lists[Number(action.id) - 1].tasks, action.index, {
                        completed: false
                    })
                })
            }
        }
        case ADD_TASK: {
            const newTask = {text: action.text, completed: false};
            if (state.lists[Number(action.id) - 1] && state.lists[Number(action.id) - 1].tasks) {
                return {
                    ...state,
                    lists: updateObjectInArray(state.lists, action.id, 'id', {
                        tasks: [...state.lists[Number(action.id) - 1].tasks, newTask]
                    })
                }
            } else {
                return {
                    ...state,
                    lists: updateObjectInArray(state.lists, action.id, 'id', {
                        tasks: [newTask]
                    })
                }
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                lists: updateObjectInArray(state.lists, action.id, 'id', {
                    tasks: removeSubObjectFromArray(state.lists[Number(action.id) - 1].tasks, action.index)
                })
            }
        }
        case EDIT_TASK_NAME: {
            return {
                ...state,
                lists: updateObjectInArray(state.lists, action.id, 'id', {
                    tasks: updateSubObjectInArray(state.lists[Number(action.id) - 1].tasks, action.index, {
                        text: action.text
                    })
                })
            }
        }
        case EDIT_TASK_NOTES: {
            return {
                ...state,
                lists: updateObjectInArray(state.lists, action.id, 'id', {
                    tasks: updateSubObjectInArray(state.lists[Number(action.id) - 1].tasks, action.index, {
                        notes: updateArray(state.lists[Number(action.id) - 1].tasks[action.index].notes, action.notesIndex, action.notes)
                    })
                })
            }
        }
        case ADD_TASK_NOTES: {
            if (state.lists[Number(action.id) - 1].tasks[action.index] && state.lists[Number(action.id) - 1].tasks[action.index].notes) {
                return {
                    ...state,
                    lists: updateObjectInArray(state.lists, action.id, 'id', {
                        tasks: updateSubObjectInArray(state.lists[Number(action.id) - 1].tasks, action.index, {
                            notes: [...state.lists[Number(action.id) - 1].tasks[action.index].notes, "New Note"]
                        })
                    })
                }
            } else {
                return {
                    ...state,
                    lists: updateObjectInArray(state.lists, action.id, 'id', {
                        tasks: updateSubObjectInArray(state.lists[Number(action.id) - 1].tasks, action.index, {
                            notes: ["New Note"]
                        })
                    })
                }
            }
        }
        case DELETE_TASK_NOTES: {
            return {
                ...state,
                lists: updateObjectInArray(state.lists, action.id, 'id', {
                    tasks: updateSubObjectInArray(state.lists[Number(action.id) - 1].tasks, action.index, {
                        notes: removeSubObjectFromArray(state.lists[Number(action.id) - 1].tasks[action.index].notes, action.notesIndex)
                    })
                })
            }
        }
        default:
            return state;
    }
};

export const setLists = lists => ({type: SET_LISTS, lists});
export const setActiveId = activeId => ({type: IS_ACTIVE, activeId});
export const addList = (id, name) => ({type: ADD_LIST, id, name});
export const editListName = (id, name) => ({type: EDIT_LIST_NAME, id, name});
export const setEditModeOn = id => ({type: EDIT_MODE_ON, id});
export const setEditModeOff = id => ({type: EDIT_MODE_OFF, id});
export const deleteList = id => ({type: DELETE_LIST, id});
export const setTaskCompleted = (id, index) => ({type: SET_TASK_COMPLETED, id, index});
export const setTaskUncompleted = (id, index) => ({type: SET_TASK_UNCOMPLETED, id, index});
export const addTask = (id, text) => ({type: ADD_TASK, id, text});
export const deleteTask = (id, index) => ({type: DELETE_TASK, id, index});
export const editTaskName = (id, index, text) => ({type: EDIT_TASK_NAME, id, index, text});
export const editTaskNotes = (id, index, notesIndex, notes) => ({type: EDIT_TASK_NOTES, id, index, notesIndex, notes});
export const addTaskNotes = (id, index) => ({type: ADD_TASK_NOTES, id, index});
export const deleteTaskNotes = (id, index, notesIndex) => ({type: DELETE_TASK_NOTES, id, index, notesIndex});

export const onAddList = (newId, newListName) => async (dispatch) => {
    dispatch(addList(newId, newListName));
    try {
        let timeStamp = firestore.Timestamp.now();
        await listsAPI.addListName(newId, newListName, timeStamp);
    } catch (error) {
        console.log("Error on adding list: ", error)
    }
};

export const onDeleteList = id => async (dispatch) => {
    dispatch(deleteList(id));
    try {
        await listsAPI.deleteList(id);
    } catch (error) {
        console.log("Error on deleting list: ", error)
    }
};

export const onChangeListName = (id, newListName) => async (dispatch) => {
    try {
        await listsAPI.updateProperties(id, {name: newListName});
        dispatch(setEditModeOff(id));
    } catch (error) {
        console.log("Error on changing name: ", error)
    }
};

export const onAddTask = (id, text, list) => async (dispatch) => {
    try {
        if (list.tasks) {
            await listsAPI.updateProperties(id, {
                tasks: [...list.tasks, {text: text, completed: false}]
            });
        } else {
            await listsAPI.updateProperties(id, {
                tasks: [{text: text, completed: false}]
            });
        }
        dispatch(addTask(id, text));
    } catch (error) {
        console.log("Error on adding task: ", error)
    }
};

export const onDeleteTask = (id, index, list) => async (dispatch) => {
    try {
        await listsAPI.updateProperties(id, {
            tasks: removeSubObjectFromArray(list.tasks, index)
        });
        dispatch(deleteTask(id, index));
    } catch (error) {
        console.log("Error on deleting task: ", error)
    }
};

const onEditTask = (id, index, list, newProps, actionCreator, props) => async (dispatch) => {
    try {
        await listsAPI.updateProperties(id, {
            tasks: updateSubObjectInArray(list.tasks, index, newProps)
        });
        dispatch(actionCreator(id, index, props))
    } catch (error) {
        console.log("Error on editing task: ", error)
    }
};

export const onChangeTaskName = (id, index, list, newProps, text) => (
    onEditTask(id, index, list, newProps, editTaskName, text)
);

export const onAddTaskNotes = (id, index, list) => async (dispatch) => {
    try {
        if (list.tasks[index].notes) {
            await listsAPI.updateProperties(id, {
                tasks: updateSubObjectInArray(list.tasks, index, {
                    notes: [...list.tasks[index].notes, "New Note"]
                })
            });
        } else {
            await listsAPI.updateProperties(id, {
                tasks: updateSubObjectInArray(list.tasks, index, {
                    notes: ["New Note"]
                })
            });
        }
        dispatch(addTaskNotes(id, index))
    } catch (error) {
        console.log("Error on adding task notes: ", error)
    }
};

export const onEditTaskNote = (id, index, list, notesIndex, notes) => async (dispatch) => {
    try {
        await listsAPI.updateProperties(id, {
            tasks: updateSubObjectInArray(list.tasks, index, {
                notes: updateArray(list.tasks[index].notes, notesIndex, notes)
            })
        });
        dispatch(editTaskNotes(id, index, notesIndex, notes))
    } catch (error) {
        console.log("Error on editing task notes: ", error)
    }
};

export const onDeleteTaskNote = (id, index, list, notesIndex) => async (dispatch) => {
    try {

        await listsAPI.updateProperties(id, {
            tasks: updateSubObjectInArray(list.tasks, index, {
                notes: removeSubObjectFromArray(list.tasks[index].notes, notesIndex)
            })
        });
        dispatch(deleteTaskNotes(id, index, notesIndex))
    } catch (error) {
        console.log("Error on deleting task notes: ", error)
    }
};

export const toggleTaskCompleted = (id, index, list) => async (dispatch) => {
    try {
        if (list.tasks[index].completed) {
            dispatch(setTaskUncompleted(id, index))
            await listsAPI.updateProperties(id, {
                tasks: updateSubObjectInArray(list.tasks, index, {
                    completed: false
                })
            });

        } else {
            dispatch(setTaskCompleted(id, index))
            await listsAPI.updateProperties(id, {
                tasks: updateSubObjectInArray(list.tasks, index, {
                    completed: true
                })
            });
        }
    } catch (error) {
        console.log("Error on setting task completed: ", error)
    }
};


export default listsReducer;