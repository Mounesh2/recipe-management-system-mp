import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="p-1.5 bg-emerald-600 rounded-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-gray-900 tracking-tight">RecipeHQ</span>
                            </Link>
                        </div>
                        
                        {/* Desktop Navigation Links */}
                        {isAuthenticated && (
                            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                                <Link
                                    to="/"
                                    className="border-transparent text-gray-500 hover:border-emerald-500 hover:text-emerald-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                >
                                    My Recipes
                                </Link>
                                <Link
                                    to="/recipes/create"
                                    className="border-transparent text-gray-500 hover:border-emerald-500 hover:text-emerald-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                >
                                    Create New
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-6">
                                <span className="hidden md:block text-sm text-gray-500">
                                    {user?.email || 'Logged in'}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
