'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext'; // Adjust path as needed

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAppContext(); // Using context for signup

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.email.trim() || !formData.password) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Option 1: Using context (recommended)
      const result = await signup(formData);
      
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Signup failed');
      }
      
      // Option 2: Direct API call (alternative)
      /*
      const response = await fetch('/api/auth/signup', {
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
        setError(data.error || 'Something went wrong');
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
          Create Account
        </h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#615004] mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#615004] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#615004] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
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
              placeholder="Enter password (min. 6 characters)"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#615004] focus:border-transparent"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#615004] text-white p-3 rounded font-medium hover:bg-[#184309] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link href="/Login" className="text-[#615004] hover:text-[#184309] font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}