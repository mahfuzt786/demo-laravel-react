# API and Web Route Documentation

## API Endpoints
The following API endpoints are defined in `api.php`:

### Authentication Endpoints

- **Register**
  - **Method**: POST
  - **URL**: `/api/register`
  - **Controller**: `AuthController@register`
  - **Description**: Handles user registration.

- **Login**
  - **Method**: POST
  - **URL**: `/api/login`
  - **Controller**: `AuthController@login`
  - **Description**: Handles user login and returns a Sanctum token.

- **Logout**
  - **Method**: POST
  - **URL**: `/api/logout`
  - **Controller**: `AuthController@logout`
  - **Middleware**: `auth:sanctum`
  - **Description**: Logs the user out by invalidating the Sanctum token.

### Order Management Endpoints

- **Get Orders**
  - **Method**: GET
  - **URL**: `/api/orders`
  - **Controller**: `OrderController@index`
  - **Middleware**: `auth:sanctum`
  - **Description**: Retrieves a list of all orders.

- **Create Order**
  - **Method**: POST
  - **URL**: `/api/orders`
  - **Controller**: `OrderController@store`
  - **Middleware**: `auth:sanctum`
  - **Description**: Creates a new order.

- **View Order Details**
  - **Method**: GET
  - **URL**: `/api/orders/{id}`
  - **Controller**: `OrderController@show`
  - **Middleware**: `auth:sanctum`
  - **Description**: Retrieves details of a specific order.

---

## Web Routes
The following web routes are defined in `web.php`:

### Public Routes

- **Homepage**
  - **Method**: GET
  - **URL**: `/`
  - **Description**: Redirects authenticated users to the admin login page or displays the login form for unauthenticated users.

### Admin Routes

- **Login**
  - **Method**: GET
  - **URL**: `/admin/login`
  - **Controller**: `AdminController@showLoginForm`
  - **Description**: Displays the admin login form.

- **Submit Login**
  - **Method**: POST
  - **URL**: `/admin/login`
  - **Controller**: `AdminController@login`
  - **Description**: Processes admin login credentials.

### Authenticated Admin Routes (with Middleware: `auth:sanctum`, `isAdmin`)

- **Dashboard**
  - **Method**: GET
  - **URL**: `/admin/dashboard`
  - **Controller**: `AdminController@dashboard`
  - **Description**: Displays the admin dashboard.

- **Orders**
  - **Method**: GET
  - **URL**: `/admin/orders`
  - **Controller**: `OrderController@listOrders`
  - **Description**: Displays a list of all orders for the admin.

- **View Order Details**
  - **Method**: GET
  - **URL**: `/admin/orders/{id}`
  - **Controller**: `OrderController@viewOrder`
  - **Description**: Displays details of a specific order for the admin.

- **Update Order Status**
  - **Method**: POST
  - **URL**: `/admin/orders/{id}/status`
  - **Controller**: `OrderController@updateOrderStatus`
  - **Description**: Updates the status of a specific order.

- **Manage Users**
  - **Method**: GET
  - **URL**: `/admin/users`
  - **Controller**: `AdminController@users`
  - **Description**: Displays a list of all users for admin management.

---

## Middleware

### Sanctum Authentication
Middleware: `auth:sanctum` ensures API requests are authenticated with Laravel Sanctum.

### Admin Authorization
Middleware: `isAdmin` ensures only admins can access certain routes.

---

## Directory Structure

- **`routes/api.php`**: Contains API routes.
- **`routes/web.php`**: Contains web routes for the application, including admin routes.
- **`app/Http/Controllers/AuthController.php`**: Handles user authentication.
- **`app/Http/Controllers/AdminController.php`**: Handles admin-related functionalities.
- **`app/Http/Controllers/OrderController.php`**: Manages order-related functionalities.

