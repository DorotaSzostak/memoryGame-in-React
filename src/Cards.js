import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css'


const Cards = (props) => {
    let style ={};
    if(props.showing){
        style.backgroundColor = props.backgroundColor;
    }
    return(
     <div className = "card-container"
        onClick={props.onClick}
        style={style}></div>
    )
}

Cards.propTypes = {
    //showing: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired
}

export default Cards;