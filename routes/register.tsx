// User registration page

import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import { db } from "../utils/database.ts";
import { createSessionResponse, getCurrentUser } from "../utils/session.ts";
import { validateEmail, validatePhone, validatePassword, validateUsername, sanitizeString } from "../utils/validation.ts";
import type { RegisterForm } from "../types/database.ts";

interface RegisterPageData {
  error?: string;
  success?: string;
  formData?: Partial<RegisterForm>;
}

export const handler: Handlers<RegisterPageData> = {
  async GET(req, ctx) {
    // Redirect if already logged in
    const userId = await getCurrentUser(req);
    if (userId) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" }
      });
    }
    
    return ctx.render({});
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const formData: RegisterForm = {
      fullname: sanitizeString(form.get("fullname")?.toString() || ""),
      username: sanitizeString(form.get("username")?.toString() || ""),
      email: sanitizeString(form.get("email")?.toString() || ""),
      phone: sanitizeString(form.get("phone")?.toString() || ""),
      password: form.get("password")?.toString() || "",
      confirmPassword: form.get("confirmPassword")?.toString() || "",
    };

    // Validation
    const errors: string[] = [];

    if (!formData.fullname || formData.fullname.length < 2) {
      errors.push("Full name must be at least 2 characters long");
    }

    if (!validateUsername(formData.username)) {
      errors.push("Username must be 3-20 characters long and contain only letters, numbers, and underscores");
    }

    if (!validateEmail(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    if (!validatePhone(formData.phone)) {
      errors.push("Please enter a valid phone number");
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      errors.push(...passwordValidation.errors);
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push("Passwords do not match");
    }

    // Check for existing users
    if (await db.getUserByUsername(formData.username)) {
      errors.push("Username already exists");
    }

    if (await db.getUserByEmail(formData.email)) {
      errors.push("Email already registered");
    }

    if (errors.length > 0) {
      return ctx.render({
        error: errors[0], // Show first error
        formData
      });
    }

    try {
      // Create user
      const user = await db.createUser({
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      // Create session and redirect
      const response = new Response(null, {
        status: 302,
        headers: { Location: "/" }
      });
      
      return await createSessionResponse(user.user_id, response);
    } catch (error) {
      return ctx.render({
        error: "Registration failed. Please try again.",
        formData
      });
    }
  },
};

export default function Register({ data }: PageProps<RegisterPageData>) {
  const { error, success, formData } = data || {};

  return (
    <div class="min-h-screen bg-gray-900">
      <Header />
      
      <div class="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
        <div class="max-w-md w-full mx-4">
          <div class="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
            
            {/* Header */}
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p class="text-gray-400">Join the Flix community</p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div class="bg-red-600 bg-opacity-20 border border-red-600 text-red-300 p-4 rounded-lg mb-6">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div class="bg-green-600 bg-opacity-20 border border-green-600 text-green-300 p-4 rounded-lg mb-6">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {success}
                </div>
              </div>
            )}

            {/* Registration Form */}
            <form method="POST" class="space-y-6">
              <div>
                <label for="fullname" class="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  value={formData?.fullname || ''}
                  class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label for="username" class="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData?.username || ''}
                  class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Choose a username"
                />
                <p class="text-gray-400 text-xs mt-1">3-20 characters, letters, numbers, and underscores only</p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData?.email || ''}
                  class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData?.phone || ''}
                  class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Create a strong password"
                />
                <p class="text-gray-400 text-xs mt-1">At least 8 characters with uppercase, lowercase, number, and special character</p>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Confirm your password"
                />
              </div>

              <div class="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
                />
                <label for="terms" class="ml-2 text-sm text-gray-300">
                  I agree to the{" "}
                  <a href="/terms" class="text-red-600 hover:text-red-500">Terms of Service</a>
                  {" "}and{" "}
                  <a href="/privacy" class="text-red-600 hover:text-red-500">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <div class="mt-8 text-center">
              <p class="text-gray-400">
                Already have an account?{" "}
                <a href="/login" class="text-red-600 hover:text-red-500 font-semibold">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}