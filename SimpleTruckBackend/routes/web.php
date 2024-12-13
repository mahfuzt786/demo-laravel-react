<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

use App\Http\Controllers\OrderController;
// use Illuminate\Support\Facades\Auth;

/**
 * Redirect root to admin login if not authenticated
 */
Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('admin.login');
});

Route::get('/login', function () {
    return redirect('/admin/login');
})->name('login');

Route::get('/admin', function () {
    return redirect('/admin/login');
})->name('login');

// Admin Routes Group
Route::prefix('admin')->group(function () {
    // Admin Login
    Route::get('/login', [AdminController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminController::class, 'login'])->name('admin.login.submit');

    // Admin register
    Route::get('/register', [AdminController::class, 'showRegisterForm'])->name('admin.register');
    Route::post('/register', [AdminController::class, 'register'])->name('admin.register.submit');

    // Authenticated Admin Routes
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        
        Route::get('/orders', [AdminController::class, 'listOrders'])->name('admin.orders.index');
        Route::post('/orders/{id}/status', [AdminController::class, 'updateOrderStatus'])->name('admin.orders.updateStatus');
        
        Route::get('/users', [AdminController::class, 'users'])->name('admin.users.index');
        Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');
        Route::post('/send-email', [AdminController::class, 'sendEmail'])->name('admin.send-email');
    });
});


