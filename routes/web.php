<?php

use App\Http\Controllers\searchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

Route::get('/buscar-funcionario', [searchController::class, 'search'])->name('search');
Route::get('/bienvenido', function (){
    return view('bienvenido');
})->name('search');