import {listsAPI} from "../api/api";
import {setLists} from "./lists-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const appInit = () => async (dispatch) => {
    try {
        let response = await listsAPI.getLists();
        const lists = response.docs.map(doc => ({id: doc.id, ...doc.data()}));
        dispatch(setLists(lists));
        dispatch(initializedSuccess());
    } catch (error) {
        console.log("Error on getting documents: ", error);
    }
};


export default appReducer;