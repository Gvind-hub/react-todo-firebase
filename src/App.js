import React, {Component} from 'react';
import {connect} from "react-redux";

import {appInit} from "./redux/app-reducer";
import SideBarContainer from "./components/SideBar/SideBarContainer";
import TaskBarContainer from "./components/TaskBar/TaskBarContainer";
import Preloader from "./components/Preloader/Preloader";
import NoteBarContainer from "./components/NoteBar/NoteBarContainer";



class App extends Component {

    componentDidMount() {
        this.props.appInit()
    }

    render() {
        if (!this.props.initialized) {
            return <div className="todo">
                <Preloader/>
            </div>
        }
        return (
            <main>
                <div className="todo">
                    <SideBarContainer/>
                    <TaskBarContainer/>
                    <NoteBarContainer/>
                </div>
            </main>

        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default connect(mapStateToProps, {appInit})(App);


