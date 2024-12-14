import api from './axiosInstance';

// routes in backend
// <?php

// use App\Http\Controllers\Auth\AuthController;
// use App\Http\Controllers\Auth\ForgetPasswordController;
// use App\Http\Controllers\Auth\OTPController;
// use App\Http\Controllers\Auth\ResetPasswordController;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Auth\AuthenticatedSessionController;


// //**************************************
// // CUSTOMER AUTH
// //**************************************
// Route::group([
//     'prefix' => 'auth'
// ], function () {
//     Route::post('/register', [AuthController::class, 'store'])->middleware('customGuest');

//     Route::post('/login', [AuthController::class, 'login'])->middleware('customGuest');

//     Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
// });



// //**************************************
// // ADMIN AUTH
// //**************************************
// Route::group([
//     'prefix' => 'auth/admin'
// ], function () {
//     Route::post('/login', [AuthController::class, 'login'])->middleware('customGuest');

//     Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
// });



// //**************************************
// // RESET PASSWORD
// //**************************************
// Route::group([
//     'prefix' => 'reset-password'
// ], function () {
//     Route::post('/email', [ForgetPasswordController::class, 'sendResetEmailLink']);

//     Route::post('/reset', [ResetPasswordController::class, 'reset'])->name('password.reset');
// });



// //**************************************
// // OTP
// //**************************************
// Route::group([
//     'prefix' => 'auth'
// ], function () {
//     Route::post('/verify-otp', [OTPController::class, 'verifyOtp']);
//     Route::post('/resend-otp', [OTPController::class, 'sendMailWithOTP']);
// });


// Add request interceptor to handle XSRF-TOKEN
api.interceptors.request.use(function (config) {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
    
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  
  return config;
});

api.interceptors.response.use(
  async response => {
    if (response.config.url === '/auth/login' && response.status === 200) {
      const userResponse = await api.get('/users/profile');
      localStorage.setItem('user', JSON.stringify(userResponse.data.data));
    }
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  register: (userData) => api.post('/auth/register', userData),
  refreshToken: () => api.post('/auth/refresh-token')
};

export default authAPI;