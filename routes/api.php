<?php

use App\Http\Controllers\Api\Task\UpdateController;
use App\Http\Controllers\Api\User\MeController;
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

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/me', MeController::class);


    Route::group(['namespace' => 'App\Http\Controllers\Api\Task', 'prefix' => 'tasks'], function () {
        Route::get('/', 'IndexController')->name('tasks.index');
        Route::get('/{task}', 'ShowController')->name('tasks.show');
        Route::post('/', 'StoreController')->name('tasks.store');
        Route::patch('/{task}', 'UpdateController')->name('tasks.update');
        Route::delete('/{task}', 'DestroyController')->name('tasks.destroy');
    });
});
