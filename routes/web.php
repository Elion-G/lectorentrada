<?php

use App\Http\Controllers\searchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/buscar-funcionario', [searchController::class, 'search'])->name('search');
