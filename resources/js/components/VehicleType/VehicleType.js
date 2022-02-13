import React from 'react';
import cartype1 from '../../../images/type1.webp'
import cartype2 from '../../../images/type2.webp'
import cartype3 from '../../../images/type3.webp'
import cartype4 from '../../../images/type4.webp'
import cartype5 from '../../../images/type5.webp'
import cartype6 from '../../../images/type6.webp'
import cartype7 from '../../../images/type7.webp'
import cartype8 from '../../../images/type8.webp'
import cartype9 from '../../../images/type9.webp'
import cartype10 from '../../../images/type10.webp'
import cartype11 from '../../../images/type11.webp'
import cartype12 from '../../../images/type12.webp'

const VehicleType = ({ type }) => {
    //Dummy car types logo to use in UI for better look and UX
    const dummyLogos = [
        cartype1,
        cartype2,
        cartype3,
        cartype4,
        cartype5,
        cartype6,
        cartype7,
        cartype8,
        cartype9,
        cartype10,
        cartype11,
        cartype12,
    ]
    return (
        <div className="col-6 col-md-4 border p-2 box">
            <img className="img-fluid logo" src={(dummyLogos[Math.floor(Math.random() * dummyLogos.length)])} alt="" />
            <br />
            <small className="text-muted" style={{
                fontSize: '9px'
            }}>{type}</small>
        </div>
    );
};

export default VehicleType;