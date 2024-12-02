<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class searchController extends Controller
{
    public function search(Request $request){
        try {
            $cin = $request->input('cin');

            $path = 'funcionarios.json';

            if (!Storage::exists($path)) {
                return response()->json([
                    'success' => false,
                    'message' => "Archivo no encontrado",
                ]);
            }

            $funcionarios = json_decode(Storage::get($path), true);

            $funcionario = collect($funcionarios)->firstWhere('CIN', $cin);

            $nombre = $funcionario['Nombre'];
            $cedula = $cin;

            // Verificar si se encontró el funcionario
            if ($funcionario) {
                $nombre = $funcionario['Nombre'];
                $cedula = $cin;

                return response()->json([
                    'success' => true,
                    'nombre' => $nombre,
                    'cedula' => $cedula,
                ]);
            }

            // Si no se encontró el funcionario
            return response()->json([
                'success' => false,
                'message' => 'Funcionario no encontrado',
            ]);
        } catch (\Throwable $th) {
            return redirect()->route('welcome')->with([
                'error' => 'QR inválido',
                'destination' => ''
            ]);
        }
    }
}
