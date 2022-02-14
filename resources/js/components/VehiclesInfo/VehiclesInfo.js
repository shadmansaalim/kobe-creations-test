import React from 'react';

const VehiclesInfo = ({ vehicle }) => {
    const { Make, Model, Type, PartNo } = vehicle;
    return (
        <div className="col-12 col-lg-4 mx-auto">
            <div className="card border-dark mb-3" style={{ maxWidth: '18rem' }}>
                <div className="card-header">Made by {Make}</div>
                <div className="card-body text-dark">
                    <h6 className="card-title">Part Number : {PartNo}</h6>
                    <small>
                        <ul className="card-text d-flex flex-column align-items-start">
                            <li>
                                Model Number : {Model}
                            </li>
                            <li>
                                Vehicle Type : {Type}
                            </li>
                        </ul>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default VehiclesInfo;