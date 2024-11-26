<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/buscar-funcionario', function (Request $request) {
    $cin = $request->input('CIN');

    $path = 'funcionarios.json';

    if (!Storage::exists($path)) {
        return response()->json([
            'success' => false,
            'message' => "Archivo no encontrado",
        ]);
    }

    $funcionarios = json_decode(Storage::get($path), true);

    $funcionario = collect($funcionarios)->firstWhere('CIN', $cin);

    if ($funcionario) {
        return response()->json([
            'success' => true,
            'message' => $funcionario['Nombre'],
            'data' => $funcionario,
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => "Funcionario no encontrado",
    ], 500);
});
