import './Home.css';
import React from 'react';
import { useEffect, useState } from 'react';
import logo from '../../../images/kobe-cars.png';
import VehicleMake from '../VehicleMake/VehicleMake';
import VehicleModel from '../VehicleModel/VehicleModel';
import VehicleType from '../VehicleType/VehicleType';
import VehiclesInfo from '../VehiclesInfo/VehiclesInfo';
import ReactPaginate from 'react-paginate';
import notFound from '../../../images/not-found.png';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    const [toggled, setToggled] = useState(false);
    const [vehiclesMake, setVehiclesMake] = useState([]);
    const [vehiclesModel, setVehiclesModel] = useState([]);
    const [vehiclesType, setVehiclesType] = useState([]);


    const [userSelected, setUserSelected] = useState([]);


    const [makes, setMakes] = useState([]);
    const [types, setTypes] = useState([]);
    const [model, setModel] = useState(null);


    useEffect(() => {
        fetch('/vehicle')
            .then(res => res.json())
            .then(data => {
                setVehicles(data.vehicles);
                setUserSelected(data.vehicles);
                setVehiclesMake(data.make);
                setVehiclesModel(data.model);
                setVehiclesType(data.type)
            })
    }, [])



    //PAGINATION SETUP CODE

    const [currentVehicles, setCurrentVehicles] = useState(userSelected);
    const [pageCount, setPageCount] = useState(0);


    const [itemOffset, setItemOffset] = useState(0);
    const vehiclesPerPage = 30;

    useEffect(() => {
        const endOffset = itemOffset + vehiclesPerPage;
        setCurrentVehicles(userSelected.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(userSelected.length / vehiclesPerPage));
    }, [itemOffset, userSelected]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * vehiclesPerPage) % userSelected.length;
        setItemOffset(newOffset);
    };


    //Make box functionality
    const handleMakeClick = (make, clicked) => {
        //Finding the vehicles that user clicked by make
        const selectedMakeVehicles = vehicles.filter(vehicle => vehicle.Make === make);


        //Checking whether user clicked on any other make brand
        if (userSelected.length !== vehicles.length) {
            //Checking whether user is clicking second time for removing the filter or not


            if (clicked) {
                const newMakes = [...makes, make];
                setMakes(newMakes);
                if (types.length) {
                    let makesPartNo = [];
                    let typesPartNo = []
                    for (const t of types) {
                        (vehicles.filter(vehicle => vehicle.Type === t)).forEach(vehicle => {
                            makesPartNo.push(vehicle.PartNo)
                        });
                    }
                    for (const m of newMakes) {
                        (vehicles.filter(vehicle => vehicle.Make === m)).forEach(vehicle => {
                            typesPartNo.push(vehicle.PartNo)
                        });
                    }

                    const commonPartNo = makesPartNo.filter(value => typesPartNo.includes(value));


                    let newSelected = [];

                    for (const number of commonPartNo) {
                        newSelected.push(vehicles.find(vehicle => vehicle.PartNo === number));
                    }

                    //Match model
                    if (model !== null) {
                        newSelected = newSelected.filter(vehicle => vehicle.Model === model);
                    }

                    setUserSelected(newSelected);
                }
                else {
                    let newSelected = vehicles.filter(vehicle => vehicle.Make === make)
                    //Match model
                    if (model !== null) {
                        newSelected = newSelected.filter(vehicle => vehicle.Model === model);
                        setUserSelected(newSelected);
                    }
                    else {
                        setUserSelected([...userSelected, ...newSelected]);
                    }
                }
            }
            else {
                setMakes(makes.filter(m => m !== make));
                const newSelected = userSelected.filter(vehicle => vehicle.Make !== make)
                //Checking whether this is the last selected box or not so that if this is unselected we can display all the vehicles
                if (newSelected.length === 0) {
                    if (types.length) {
                        let typesVehicles = [];
                        for (const t of types) {
                            (vehicles.filter(vehicle => vehicle.Type === t)).forEach(vehicle => {
                                typesVehicles.push(vehicle)
                            });
                        }

                        //Match model
                        if (model !== null) {
                            setUserSelected(typesVehicles.filter(vehicle => vehicle.Model === model));
                        }
                        else {
                            setUserSelected(typesVehicles);
                        }
                    }
                    //Match model
                    else if (model !== null && !types.length) {
                        setUserSelected(vehicles.filter(vehicle => vehicle.Model === model));
                    }
                    else {
                        setUserSelected(vehicles);
                    }
                }
                else {
                    if (model !== null) {
                        setUserSelected(userSelected.filter(vehicle => vehicle.Model === model));
                    }
                    else {
                        setUserSelected(newSelected);
                    }
                }
            }
        }
        else {
            setMakes([make]);
            setUserSelected(selectedMakeVehicles);
        }

        window.scrollTo(0, 0);

    }

    //Make box functionality
    const handleTypeClick = (type, clicked) => {
        //Finding the vehicles that user clicked by type
        const selectedTypeVehicles = vehicles.filter(vehicle => vehicle.Type === type);


        //Checking whether user clicked on any other type of vehicle
        if (userSelected.length !== vehicles.length) {
            //Checking whether user is clicking second time for removing the filter or not


            if (clicked) {
                const newTypes = [...types, type];
                setTypes(newTypes);
                if (makes.length) {
                    let makesPartNo = [];
                    let typesPartNo = []
                    for (const m of makes) {
                        (vehicles.filter(vehicle => vehicle.Make === m)).forEach(vehicle => {
                            makesPartNo.push(vehicle.PartNo)
                        });
                    }
                    for (const t of newTypes) {
                        (vehicles.filter(vehicle => vehicle.Type === t)).forEach(vehicle => {
                            typesPartNo.push(vehicle.PartNo)
                        });
                    }

                    const commonPartNo = makesPartNo.filter(value => typesPartNo.includes(value));

                    let newSelected = [];

                    for (const number of commonPartNo) {
                        newSelected.push(vehicles.find(vehicle => vehicle.PartNo === number));
                    }

                    //Match model
                    if (model !== null) {
                        newSelected = newSelected.filter(vehicle => vehicle.Model === model);
                    }
                    setUserSelected(newSelected);
                }
                else {
                    let newSelected = vehicles.filter(vehicle => vehicle.Type === type)
                    //Match model
                    if (model !== null) {
                        newSelected = newSelected.filter(vehicle => vehicle.Model === model);
                        setUserSelected(newSelected);
                    }
                    else {
                        setUserSelected([...userSelected, ...newSelected]);
                    }
                }
            }
            else {
                setTypes(types.filter(t => t !== type));
                const newSelected = userSelected.filter(vehicle => vehicle.Type !== type)

                //Checking whether this is the last selected box or not so that if this is unselected we can display all the vehicles
                if (newSelected.length === 0) {
                    if (makes.length) {
                        let makesVehicles = [];
                        for (const m of makes) {
                            (vehicles.filter(vehicle => vehicle.Make === m)).forEach(vehicle => {
                                makesVehicles.push(vehicle)
                            });
                        }
                        //Match model
                        if (model !== null) {
                            setUserSelected(makesVehicles.filter(vehicle => vehicle.Model === model));
                        }
                        else {
                            setUserSelected(makesVehicles);
                        }
                    }
                    //Match model
                    else if (model !== null && !makes.length) {
                        setUserSelected(vehicles.filter(vehicle => vehicle.Model === model));
                    }
                    else {
                        setUserSelected(vehicles);
                    }
                }
                else {
                    setUserSelected(newSelected);
                }
            }
        }
        else {
            setTypes([type]);
            setUserSelected(selectedTypeVehicles);
        }
        window.scrollTo(0, 0);
    }


    //Model Drop Down Functionality
    const handleModelOnChange = (e) => {
        const model = e.target.value;
        setModel(e.target.value);

        if (makes.length || types.length) {
            const newSelected = userSelected.filter(vehicle => vehicle.Model === model);
            setUserSelected(newSelected);
        }
        else {
            const newSelected = vehicles.filter(vehicle => vehicle.Model === model);
            setUserSelected(newSelected);
        }
        window.scrollTo(0, 0);
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
                                    <div className="row mx-auto col-11">
                                        {
                                            vehiclesMake.map(make => <VehicleMake
                                                key={vehiclesMake.indexOf(make)}
                                                index={vehiclesMake.indexOf(make)}
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
                                        <select onChange={
                                            handleModelOnChange
                                        } className="form-select p-0 ps-2" id="floatingSelect" aria-label="Floating label select example">
                                            <option disabled defaultValue selected>Models</option>
                                            {
                                                vehiclesModel.map(model => <VehicleModel
                                                    key={vehiclesModel.indexOf(model)}
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
                                    <div className="row col-11 mx-auto">
                                        {
                                            vehiclesType.map(type => <VehicleType
                                                key={vehiclesType.indexOf(type)}
                                                index={vehiclesType.indexOf(type)}
                                                type={type}
                                                handleTypeClick={handleTypeClick}
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
                                {
                                    userSelected.length
                                        ?
                                        <div className="row">
                                            {

                                                currentVehicles.map(vehicle => <VehiclesInfo
                                                    key={currentVehicles.indexOf(vehicle)}
                                                    vehicle={vehicle}
                                                />)

                                            }
                                        </div>
                                        :
                                        <div >
                                            <h4 className="text-center fw-bold">No Vehicles Available Based On Your Filter</h4>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img className="img-fluid col-11 col-md-9 col-lg-6 mx-auto" src={notFound} alt="" />
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>

            }
        </>

    );
};

export default Home;