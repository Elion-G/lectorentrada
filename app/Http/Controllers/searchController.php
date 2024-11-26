<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class searchController extends Controller
{
    public function search(Request $request){
        $cin = $request->cin;

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
    }
}
