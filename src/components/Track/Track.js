import React from 'react';
import ReactDOM from 'react-dom';
import './Track.css';


const Track = (props) => {


  const renderAction = () => {
    if(props.isRemoval) {
      return <a className="Track-action" onClick={removeTrack} >-</a>;
    } else {
      return <a className="Track-action" onClick={addTrack} >+</a>;
    }
    }

    const addTrack = (event) => {
      props.onAdd(props.track);
    }

    const removeTrack = (event) =>  {
      props.onRemove(props.track);
    }




 
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{props.track.name}</h3>
          <p>{props.track.artist} | {props.track.album}</p>
        </div>
        {renderAction()}
      </div>
    );
  
  }

export default Track;
