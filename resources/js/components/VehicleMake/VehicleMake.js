import React from 'react';
import carlogo1 from '../../../images/carlogo1.jpeg'
import carlogo2 from '../../../images/carlogo2.webp'
import carlogo3 from '../../../images/carlogo3.webp'
import carlogo4 from '../../../images/carlogo4.webp'
import carlogo5 from '../../../images/carlogo5.webp'
import carlogo6 from '../../../images/carlogo6.webp'
import carlogo7 from '../../../images/carlogo7.webp'
import carlogo8 from '../../../images/carlogo8.webp'
import carlogo9 from '../../../images/carlogo9.webp'
import carlogo10 from '../../../images/carlogo10.webp'

const VehicleMake = ({ make, handleMakeClick }) => {
    //Dummy car logos to use in UI for better look and UX
    const dummyLogos = [
        carlogo1,
        carlogo2,
        carlogo3,
        carlogo4,
        carlogo5,
        carlogo6,
        carlogo7,
        carlogo8,
        carlogo9,
        carlogo10,
    ]
    return (
        <div className="col-6 col-md-3 border p-2 box"
            onClick={() => handleMakeClick(make)}>
            <img className="img-fluid logo" src={(dummyLogos[Math.floor(Math.random() * dummyLogos.length)])} alt="" />
            <br />
            <small className="text-muted" style={{
                fontSize: '9px'
            }}>{make}</small>
        </div>
    );
};

export default VehicleMake;