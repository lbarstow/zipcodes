import React from 'react';

const DisplayBox = (props) => {
  let distance =() =>{
    // i used online resources for this, but don't have a specific source, as most used an identical implenemtaion
    let R = 3959;
    let lat1 = props.firstZip.lat;
    let lat2 = props.secondZip.lat;
    let lon1 = props.firstZip.lon;
    let lon2 = props.secondZip.lon;
    let dLat = (lat2-lat1) * Math.PI / 180;
    let dLon = (lon2-lon1) * Math.PI / 180;
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d.toFixed(2);
  }

  return (
    <div>
      <h1>
        {distance()} Miles
      </h1>
      <h3>
        Between {props.firstZip.zip} and {props.secondZip.zip}
      </h3>
    </div>

  );
}

export default DisplayBox;
