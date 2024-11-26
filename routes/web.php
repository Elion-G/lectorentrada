<?php

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/buscar-funcionario', function (Request $request) {
    $cin = $request->input('CIN');

    $path = 'public/funcionarios.json';
    $funcionarios = json_decode(Storage::get($path), true);

    $funcionario = collect($funcionarios)->firstWhere('CIN', $cin);

    if ($funcionario) {
        return response()->json([
            'success' => true,
            'message' => "Bienvenido {$funcionario['Nombre']}",
            'data' => $funcionario,
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => "Funcionario no encontrado",
        ]);
    }
});