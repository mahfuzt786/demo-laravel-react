# demo-laravel-react
 demo-laravel-react
 
 # Truck Ordering Application

This guide provides step-by-step instructions for setting up the frontend (React Native) and backend (Laravel) for the Truck Ordering Application.

---

## **Frontend Setup (React Native)**

### **1. Prerequisites**
- Node.js (v16.x or later)
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode for emulator (or physical device for testing)

### **2. Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SimpleTruckApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Launch the app:
   - Use the Expo Go app on your mobile device, or web
   - Use an emulator configured in Android Studio or Xcode.

### **3. Configuration**
Update the `baseURL` for Axios in `src/config/api.js` to point to the backend server:
```javascript
export const baseURL = 'http://localhost:8000/api';
```

---

## **Backend Setup (Laravel)**

### **1. Prerequisites**
- PHP (v8.1 or later)
- Composer
- MySQL or SQLite
- Node.js (for Vite asset building)

### **2. Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SimpleTruckBackend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your database credentials:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=truck_app
   DB_USERNAME=root
   DB_PASSWORD=
   ```
5. Generate the application key:
   ```bash
   php artisan key:generate
   ```
6. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```

### **3. Sanctum Authentication**
1. Publish Sanctum's configuration:
   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```
2. Run migrations for Sanctum:
   ```bash
   php artisan migrate
   ```
3. Add Sanctum's middleware to `app/Http/Kernel.php` in the `api` group:
   ```php
   'api' => [
       \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
       'throttle:api',
       \Illuminate\Routing\Middleware\SubstituteBindings::class,
   ],
   ```

### **4. Asset Compilation**
1. Install Node.js dependencies:
   ```bash
   npm install
   ```
2. Build assets:
   ```bash
   npm run dev
   ```
   For production:
   ```bash
   npm run build
   ```

### **5. Run the Development Server**
1. Start the Laravel server:
   ```bash
   php artisan serve
   ```
2. The backend API will be available at `http://localhost:8000`.

### **6. API Endpoints**
- **Login:** `POST /api/login`
- **Register:** `POST /api/register`
- **Place Order:** `POST /api/orders`
- **Get Orders:** `GET /api/orders`
- **Admin Dashboard:** `GET /admin/dashboard`

---

## **Testing the Application**
1. Run the backend server:
   ```bash
   php artisan serve
   ```
2. Run the frontend:
   ```bash
   npm start
   ```
3. Access the application using the Expo Go app or emulator, and ensure the backend is reachable at `http://localhost:8000`.

---

For any issues, please contact.


