import React from 'react';
import preloader from '../../assets/img/Eclipse-1.4s-200px.svg'


import './Preloader.scss'

const Preloader = () => {
    return (
            <div className="preloader">
                <img src={preloader} alt="preloader" className="preloader__img"/>
            </div>
    )
};


export default Preloader;