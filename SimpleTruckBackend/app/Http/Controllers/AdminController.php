<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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
    public function listOrders()
    {
        $orders = Order::with('user')->paginate(10);
        return view('admin.orders.index', compact('orders'));
    }

    public function viewOrder(Request $request, $id)
    {
        // $orders = Order::with('user')->paginate(10);
        $order = Order::findOrFail($id);

        return view('admin.orders.index', compact('orders'));
    }

    // Update Order Status
    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected,completed',
            'email_content' => 'required|string',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        // Sending email notification
        $userEmail = $order->user->email;
        $userName = $order->user->name;
        $emailContent = $request->email_content;

        try {
            Mail::raw($emailContent, function ($message) use ($userEmail) {
                $message->to($userEmail)->subject('Order Status Update');
            });
        } catch (\Exception $e) {
            return redirect()->route('admin.orders.index')->with('error', 'Order updated but email could not be sent. Error: ' . $e->getMessage());
        }

        return redirect()->route('admin.orders.index')->with('success', 'Order status updated and email notification sent successfully.');
    }

    // View Users
    public function users()
    {
        $users = User::paginate(10);
        return view('admin.users.index', compact('users'));
    }

    public function sendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'content' => 'required|string'
        ]);

        $email = $request->input('email');
        $content = $request->input('content');

        try {
            Mail::raw($content, function ($message) use ($email) {
                $message->to($email)->subject('Message from Admin');
            });

            return response()->json(['message' => 'Email sent successfully.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to send email.'], 500);
        }
    }

    public function logout(Request $request)
    {
        // Log out the admin user
        Auth::guard('web')->logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate the session token to prevent session fixation
        $request->session()->regenerateToken();

        // Redirect to the login page with a success message
        return redirect()->route('admin.login')->with('success', 'You have been logged out successfully.');
    }

}
