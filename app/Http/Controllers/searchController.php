<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class searchController extends Controller
{
    public function search(Request $request){
        try {
            $cin = $request->input('cin');

            // Rutas de los archivos JSON
            $funcionariosPath = 'funcionarios.json';
            $llamadosPath = 'llamados.json';

            // Verificar si los archivos existen
            if (!Storage::exists($funcionariosPath)) {
                return response()->json([
                    'success' => false,
                    'message' => "Archivo de funcionarios no encontrado",
                ]);
            }

            if (!Storage::exists($llamadosPath)) {
                // Crear el archivo "llamados.json" si no existe
                Storage::put($llamadosPath, json_encode([]));
            }

            $funcionarios = json_decode(Storage::get($funcionariosPath), true);
            $llamados = json_decode(Storage::get($llamadosPath), true);

            $funcionario = collect($funcionarios)->firstWhere('CIN', $cin);

            if (!$funcionario) {
                return response()->json([
                    'success' => false,
                    'message' => 'Funcionario no encontrado',
                ]);
            }

            $nombre = $funcionario['Nombre'];
            $apellido = $funcionario['Apellido'];
            $nombre_completo = $nombre . ' ' . $apellido;
            $cedula = $cin;

            // Verificar si ya está en llamados.json
            $yaLlamado = collect($llamados)->firstWhere('CIN', $cin);

            if ($yaLlamado) {
                return response()->json([
                    'success' => false,
                    'nombre' => $nombre_completo,
                    'cedula' => $cedula,
                    'message' => 'ya ingresó.',
                ]);
            }

            // Agregar al funcionario a "llamados.json"
            $llamados[] = [
                'nombre' => $nombre_completo,
                'cedula' => $cedula,
                'LlamadoEn' => now()->toDateTimeString(), // Registrar la fecha/hora del llamado
            ];
            Storage::put($llamadosPath, json_encode($llamados, JSON_PRETTY_PRINT));

            $nombre = $funcionario['Nombre'];
            $cedula = $cin;

            return response()->json([
                'success' => true,
                'nombre' => $nombre_completo,
                'cedula' => $cedula,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
