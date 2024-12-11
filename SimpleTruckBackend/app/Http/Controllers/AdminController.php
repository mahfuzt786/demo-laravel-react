<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
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
