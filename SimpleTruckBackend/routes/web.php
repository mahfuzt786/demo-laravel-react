<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Auth;

// Auth::routes();


Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('home');
    }

    return view('welcome');
});


// Admin Routes Group
Route::prefix('admin')->group(function () {
    // Admin Login
    Route::get('/login', [AdminController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminController::class, 'login'])->name('admin.login.submit');

    // Authenticated Admin Routes with Middleware
    Route::middleware(['auth:sanctum', 'isAdmin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/orders', [OrderController::class, 'listOrders'])->name('admin.orders');
        Route::get('/orders/{id}', [OrderController::class, 'viewOrder'])->name('admin.orders.view');
        Route::post('/orders/{id}/status', [OrderController::class, 'updateOrderStatus'])->name('admin.orders.update');
        Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    });
});

