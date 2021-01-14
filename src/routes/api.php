<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChecklistController;
use App\Http\Controllers\Api\NoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->apiResource('notes', NoteController::class);
Route::middleware('auth:sanctum')->apiResource('categories', CategoryController::class);
Route::middleware('auth:sanctum')->apiResource('checklists', ChecklistController::class);
