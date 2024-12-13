<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AdminController extends Controller
{
    public function showRegisterForm()
    {
        return view('admin.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Save the admin user 
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => true,
        ]);

        return redirect()->route('admin.login')->with('success', 'Registration successful. Please login.');
    }
    
    public function showLoginForm()
    {
        return view('admin.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            if (Auth::user()->is_admin) {
                return redirect()->route('admin.dashboard');
            } else {
                Auth::logout();
                return redirect()->route('admin.login')->withErrors('Access denied for non-admin users.');
            }
        }
        return redirect()->route('admin.login')->withErrors('Invalid credentials.');
    }

    // Admin Dashboard
    public function dashboard()
    {
        $ordersCount = Order::count();
        $usersCount = User::count();
        return view('admin.dashboard', compact('ordersCount', 'usersCount'));
    }

    // View Orders
    public function orders()
    {
        $orders = Order::with('user')->paginate(10);
        return view('admin.orders', compact('orders'));
    }

    // Update Order Status
    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected,completed',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return redirect()->route('admin.orders')->with('success', 'Order status updated successfully.');
    }

    // View Users
    public function users()
    {
        $users = User::paginate(10);
        return view('admin.users', compact('users'));
    }
}
