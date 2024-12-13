<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="/admin/css/app.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" defer></script>
    <script src="/admin/js/app.js" defer></script>
</head>
<body>
    <div class="min-vh-100 d-flex flex-column">
        <!-- Navbar -->
        <header class="bg-dark text-white py-2">
            <div class="container d-flex justify-content-between align-items-center">
                <h1>Admin Panel</h1>
                <a href="{{ route('admin.logout') }}" class="text-danger">Logout</a>
            </div>
        </header>

        <!-- Content -->
        <main class="flex-grow-1">
            @yield('content')
        </main>

        <!-- Footer -->
        <footer class="bg-secondary text-white py-2 text-center">
            &copy; {{ date('Y') }} Truck Ordering Application
        </footer>
    </div>
</body>
</html>