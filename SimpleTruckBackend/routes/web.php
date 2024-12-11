<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Auth;

// use App\Http\Controllers\Admin\OrderController;
// use App\Http\Controllers\Admin\AdminController;

// Grouped Admin Routes with Middleware
Route::prefix('admin')->middleware(['auth:sanctum', 'isAdmin'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/orders', [OrderController::class, 'listOrders'])->name('admin.orders');
    Route::get('/orders/{id}', [OrderController::class, 'viewOrder'])->name('admin.orders.view');
    Route::post('/orders/{id}/status', [OrderController::class, 'updateOrderStatus'])->name('admin.order.update');
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
});

Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return view('welcome');
});

