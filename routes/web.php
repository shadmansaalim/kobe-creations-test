<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;


Route::get('/', function () {
    return view('welcome');
});

Route::resource('/vehicle', VehicleController::class);