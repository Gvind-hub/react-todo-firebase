import {firestore, initializeApp} from 'firebase';


initializeApp ({
    apiKey: "AIzaSyCpzdEFwXDAiADc-l2Qr5v5mpq7ofY_qhQ",
    authDomain: "react-todolist-firebase.firebaseapp.com",
    databaseURL: "https://react-todolist-firebase.firebaseio.com",
    projectId: "react-todolist-firebase",
    storageBucket: "react-todolist-firebase.appspot.com",
    messagingSenderId: "619585413692",
    appId: "1:619585413692:web:c3ac68e6ce1a042c151939"
});

export const db = firestore();

export const listsAPI = {
    getLists() {
        return db.collection("lists").orderBy('created', 'asc').get()
    },
    getTask(id) {
        return db.collection("lists").doc(`${id}`).get()
    },
    addListName(id, newListName, timeStamp) {
        return db.collection("lists").doc(`${id}`).set({
            name: newListName,
            created: timeStamp
        })
    },
    updateProperties(id, newObjProps) {
        return db.collection("lists").doc(`${id}`).update(newObjProps)
    },
    deleteList(id) {
        return db.collection("lists").doc(`${id}`).delete()
    },
};