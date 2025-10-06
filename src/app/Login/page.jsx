'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext'; // Adjust path as needed

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAppContext(); // Using context for login

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.password) {
      setError('All fields are required');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Option 1: Using context (recommended)
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        router.push('/Profile');
      } else {
        setError(result.error || 'Login failed');
      }
      
      // Option 2: Direct API call (alternative)
      /*
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        setError(data.error || 'Invalid credentials');
      }
      */
      
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef6eb] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-[#615004] text-center mb-6">
          Login
        </h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#615004] mb-1">
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username or email"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#615004] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#615004] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#615004] focus:border-transparent"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#615004] text-white p-3 rounded font-medium hover:bg-[#184309] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link href="/Signup" className="text-[#615004] hover:text-[#184309] font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}