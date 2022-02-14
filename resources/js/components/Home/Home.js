import './Home.css';
import React from 'react';
import { useEffect, useState } from 'react';
import logo from '../../../images/kobe-cars.png';
import VehicleMake from '../VehicleMake/VehicleMake';
import VehicleModel from '../VehicleModel/VehicleModel';
import VehicleType from '../VehicleType/VehicleType';
import VehiclesInfo from '../VehiclesInfo/VehiclesInfo';



const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [toggled, setToggled] = useState(false);


    useEffect(() => {
        fetch('/vehicle')
            .then(res => res.json())
            .then(data => setVehicles(data.vehicles))
    }, [])


    //Making separate arrays with Make, Model and Type for easy data use.
    const vehiclesMake = [];
    const vehiclesModel = [];
    const vehiclesType = [];
    for (const vehicle of vehicles) {
        if (vehiclesMake.indexOf(vehicle.Make) === -1) {
            vehiclesMake.push(vehicle.Make)
        }
        if (vehiclesModel.indexOf(vehicle.Model) === -1) {
            vehiclesModel.push(vehicle.Model)
        }
        if (vehiclesType.indexOf(vehicle.Type) === -1) {
            vehiclesType.push(vehicle.Type)
        }
    }

    return (
        <div className={toggled ? "d-flex toggled" : "d-flex"} id="wrapper">

            <div id="sidebar-wrapper">
                <div className="text-center pt-4 pb-2 border-bottom">
                    <img src={logo} alt="Kobe Cars Logo" width="150px" />
                </div>
                <div className="list-group my-3">
                    <div className="my-3">
                        <div className="d-flex">
                            <h6 className="ms-2">Makes</h6>
                        </div>
                        <div className="col-11 row mx-auto d-flex ">
                            {
                                vehiclesMake.map(make => <VehicleMake
                                    make={make}
                                ></VehicleMake>)
                            }
                        </div>
                    </div>
                    <div className="my-3">
                        <div className="d-flex">
                            <h6 className="ms-2">Models</h6>
                        </div>
                        <div className="form-floating col-11 mx-auto">
                            <select className="form-select p-0 ps-2" id="floatingSelect" aria-label="Floating label select example">
                                <option defaultValue>Models</option>
                                {
                                    vehiclesModel.map(model => <VehicleModel
                                        model={model}
                                    ></VehicleModel>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="my-3">
                        <div className="d-flex">
                            <h6 className="ms-2">Types</h6>
                        </div>
                        <div className="col-11 row mx-auto d-flex ">
                            {
                                vehiclesType.map(type => <VehicleType
                                    type={type}
                                ></VehicleType>)
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div id="page-content-wrapper" style={{ backgroundColor: '#f2f2f2' }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i onClick={() => setToggled(!toggled)} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"
                            style={{ color: '#007cc2' }}
                        ></i>
                        <h3 className="m-0 text-uppercase project-title"
                        >KOBE CARS CREATION</h3>
                    </div>
                </nav>
                <div className="container-fluid px-4 mt-4">
                    <div className="row mx-auto">
                        {
                            vehicles.map(vehicle => <VehiclesInfo
                                vehicle={vehicle}
                            />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;