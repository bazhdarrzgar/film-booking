// Login page route

import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import { db } from "../utils/database.ts";
import { createSessionResponse, getCurrentUser } from "../utils/session.ts";
import { validateUsername } from "../utils/validation.ts";

interface LoginPageData {
  error?: string;
  username?: string;
}

export const handler: Handlers<LoginPageData> = {
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
    const username = form.get("username")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    // Validation
    if (!username || !password) {
      return ctx.render({ 
        error: "Please fill in all fields",
        username 
      });
    }

    if (!validateUsername(username)) {
      return ctx.render({ 
        error: "Invalid username format",
        username 
      });
    }

    // Authenticate user
    const user = await db.authenticateUser(username, password);
    if (!user) {
      return ctx.render({ 
        error: "Invalid username or password",
        username 
      });
    }

    // Create session and redirect
    const response = new Response(null, {
      status: 302,
      headers: { Location: "/" }
    });
    
    return await createSessionResponse(user.user_id, response);
  },
};

export default function Login({ data }: PageProps<LoginPageData>) {
  const { error, username } = data || {};

  return (
    <div class="min-h-screen bg-gray-900">
      <Header />
      
      <div class="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div class="max-w-md w-full mx-4">
          <div class="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
            
            {/* Header */}
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p class="text-gray-400">Sign in to your account</p>
            </div>

            {/* Error Message */}
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

            {/* Login Form */}
            <form method="POST" class="space-y-6">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username || ''}
                  class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
                />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label for="remember-me" class="ml-2 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <a href="/forgot-password" class="text-sm text-red-600 hover:text-red-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Sign In
              </button>
            </form>

            {/* Register Link */}
            <div class="mt-8 text-center">
              <p class="text-gray-400">
                Don't have an account?{" "}
                <a href="/register" class="text-red-600 hover:text-red-500 font-semibold">
                  Sign up here
                </a>
              </p>
            </div>

            {/* Admin Login */}
            <div class="mt-6 pt-6 border-t border-gray-700 text-center">
              <a 
                href="/admin/login" 
                class="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}