// Dummy API endpoints - Replace these with your actual backend URLs
export const API_ENDPOINTS = {
  // Signup endpoint - POST /signup
  // Payload: { username: string, email: string, password: string }
  // Response: { success: boolean, message: string, data?: { userId: string, email: string } }
  signup: 'https://api.example.com/auth/signup',

  // Verify OTP endpoint - POST /verify-otp
  // Payload: { email: string, otp: string }
  // Response: { success: boolean, message: string, data?: { token: string } }
  verifyOtp: 'https://api.example.com/auth/verify-otp',

  // Sign in endpoint - POST /signin
  // Payload: { email: string, password: string }
  // Response: { success: boolean, message: string, data?: { token: string, user: { id: string, email: string, username: string } } }
  signin: 'https://api.example.com/auth/signin',

  // Forgot password endpoint - POST /forgot-password
  // Payload: { email: string }
  // Response: { success: boolean, message: string }
  forgotPassword: 'https://api.example.com/auth/forgot-password',

  // Reset password endpoint - POST /reset-password
  // Payload: { email: string, otp: string, newPassword: string }
  // Response: { success: boolean, message: string }
  resetPassword: 'https://api.example.com/auth/reset-password',
};

// Helper function to make API calls
export async function callApi(
  endpoint: string,
  payload: Record<string, any>,
) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(message);
  }
}
