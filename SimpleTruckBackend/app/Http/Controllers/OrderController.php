<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Notifications\NewOrderNotification;

class OrderController extends Controller
{
    public function index()
    {
        return Order::where('user_id', Auth::id())->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'location' => 'required|string',
            'size' => 'required|string',
            'weight' => 'required|string',
            'pickup_time' => 'required|date|after:now',
            'delivery_time' => 'required|date|after:pickup_time',
        ]);

        $order = Order::create([
            'user_id' => Auth::id(),
            'location' => $request->location,
            'size' => $request->size,
            'weight' => $request->weight,
            'pickup_time' => $request->pickup_time,
            'delivery_time' => $request->delivery_time,
        ]);

        // Notify admin
        $admin = User::where('is_admin', true)->first();
        $admin->notify(new NewOrderNotification($order));

        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = Order::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        return response()->json($order);
    }
}

