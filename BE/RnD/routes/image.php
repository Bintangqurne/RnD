<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;


Route::middleware('auth')->group(function(){
    Route::get('/images', [ImageController::class, 'index'])->name('images.index');
    Route::post('/images', [ImageController::class, 'store'])->name('images.store');
    Route::delete('/images/{image}', [ImageController::class, 'destroy'])->name('images.destroy');


    Route::get('/send-email', [EmailController::class, 'create'])->name('email.form');
    Route::post('/send-email', [EmailController::class, 'send'])->name('email.send');
});
