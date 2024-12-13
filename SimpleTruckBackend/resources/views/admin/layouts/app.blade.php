<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <!-- <link rel="stylesheet" href="/admin/css/app.css"> -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
</head>
<body>
    <div class="min-vh-100 d-flex flex-column">
        <!-- Navbar -->
        <header class="bg-dark text-white py-2">
            <div class="container d-flex justify-content-between align-items-center">
                <h1>Admin Panel</h1>
                <nav class="d-flex gap-3">
                    <a href="{{ route('admin.dashboard') }}" class="text-white">Dashboard</a>
                    <a href="{{ route('admin.users.index') }}" class="text-white">Users</a>
                    <a href="{{ route('admin.orders.index') }}" class="text-white">Orders</a>
                    <!-- <a href="{{ route('admin.logout') }}" class="text-danger">Logout</a> -->
                    <a> 
                    <form action="{{ route('admin.logout') }}" method="POST" style="display: inline;">
                        @csrf
                        <button type="submit" class="btn btn-danger">Logout</button>
                    </form>
                    </a>
                </nav>
            </div>
        </header>

        <!-- Content -->
        <main class="flex-grow-1">
            @yield('content')
        </main>

        <!-- Include jQuery and Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

        <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
        <!-- Yield scripts -->
        @yield('scripts')

        <!-- Footer -->
        <footer class="bg-secondary text-white py-2 text-center">
            &copy; {{ date('Y') }} Truck Ordering Application
        </footer>
    </div>
</body>
</html>
