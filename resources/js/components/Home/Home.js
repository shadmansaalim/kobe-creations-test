import './Home.css';
import React from 'react';
import { useEffect, useState } from 'react';
import logo from '../../../images/kobe-cars.png';



const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [toggled, setToggled] = useState(false);

    useEffect(() => {
        fetch('http://localhost/kobe-backend/vehicles.php')
            .then(res => res.json())
            .then(data => setVehicles(data))
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

    console.log(vehiclesType);
    return (
        <div className={toggled ? "d-flex toggled" : "d-flex"} id="wrapper">

            <div id="sidebar-wrapper">
                <div className="text-center pt-4 pb-2 border-bottom">
                    <img src={logo} alt="Kobe Cars Logo" width="150px" />
                </div>
                <div className="list-group my-3">

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

                </div>
            </div>
        </div>
    );
};

export default Home;