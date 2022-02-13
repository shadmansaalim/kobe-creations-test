import React from 'react';

const VehiclesInfo = ({ vehicle }) => {
    const { Make, Model, Type, PartNo } = vehicle;
    return (
        <div className="col-12 col-lg-4 mx-auto">
            <div class="card border-dark mb-3" style={{ maxWidth: '18rem' }}>
                <div class="card-header">Made by {Make}</div>
                <div class="card-body text-dark">
                    <h6 class="card-title">Part Number : {PartNo}</h6>
                    <small>
                        <ul class="card-text d-flex flex-column align-items-start">
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