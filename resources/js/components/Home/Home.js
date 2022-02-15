import './Home.css';
import React from 'react';
import { useEffect, useState } from 'react';
import logo from '../../../images/kobe-cars.png';
import VehicleMake from '../VehicleMake/VehicleMake';
import VehicleModel from '../VehicleModel/VehicleModel';
import VehicleType from '../VehicleType/VehicleType';
import VehiclesInfo from '../VehiclesInfo/VehiclesInfo';
import ReactPaginate from 'react-paginate';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [toggled, setToggled] = useState(false);
    const [vehiclesMake, setVehiclesMake] = useState([]);
    const [vehiclesModel, setVehiclesModel] = useState([]);
    const [vehiclesType, setVehiclesType] = useState([]);



    useEffect(() => {
        fetch('/vehicle')
            .then(res => res.json())
            .then(data => {
                setVehicles(data.vehicles);
                setVehiclesMake(data.make);
                setVehiclesModel(data.model);
                setVehiclesType(data.type)
            })
    }, [])


    //PAGINATION SETUP CODE

    const [currentVehicles, setCurrentVehicles] = useState([...vehicles]);
    const [pageCount, setPageCount] = useState(0);


    const [itemOffset, setItemOffset] = useState(0);
    const vehiclesPerPage = 30;

    useEffect(() => {
        const endOffset = itemOffset + vehiclesPerPage;
        setCurrentVehicles(vehicles.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(vehicles.length / vehiclesPerPage));
    }, [itemOffset, vehicles]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * vehiclesPerPage) % vehicles.length;
        setItemOffset(newOffset);
    };


    //Make box functionality
    const handleMakeClick = (make) => {
        const selectedMakeVehicles = vehicles.filter(vehicle => vehicle.Make === make);
        setVehicles(selectedMakeVehicles);
    }

    return (
        <>
            {
                vehicles.length && vehiclesMake.length && vehiclesModel.length && vehiclesType.length
                    ?
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
                                                handleMakeClick={handleMakeClick}
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
                            <div className="container-fluid px-4">

                            </div>
                            <div className="d-flex justify-content-center mx-auto">
                                {/* Calling the course pagination component for pagination */}
                                <ReactPaginate
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={pageCount}
                                    previousLabel="<"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                            <div className="container-fluid px-4 mt-5">
                                <div className="row">
                                    {
                                        currentVehicles.map(vehicle => <VehiclesInfo
                                            vehicle={vehicle}
                                        />)
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    :
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div class="spinner">
                            <div class="double-bounce1"></div>
                            <div class="double-bounce2"></div>
                        </div>
                    </div>

            }
        </>

    );
};

export default Home;