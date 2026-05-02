import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';

// A simple wrapper to redirect logged-in users away from the login/register pages
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null;
    return isAuthenticated ? <Navigate to="/" replace /> : children;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
                    <Navbar />
                    
                    <main className="flex-grow">
                        <Routes>
                            {/* Public Auth Routes */}
                            <Route 
                                path="/login" 
                                element={
                                    <PublicRoute>
                                        <LoginPage />
                                    </PublicRoute>
                                } 
                            />
                            <Route 
                                path="/register" 
                                element={
                                    <PublicRoute>
                                        <RegisterPage />
                                    </PublicRoute>
                                } 
                            />

                            {/* Recipe Routes */}
                            <Route 
                                path="/" 
                                element={<RecipeListPage />} 
                            />
                            
                            <Route 
                                path="/recipes/create" 
                                element={
                                    <ProtectedRoute>
                                        <CreateRecipePage />
                                    </ProtectedRoute>
                                } 
                            />

                            <Route 
                                path="/recipes/:id" 
                                element={<RecipeDetailPage />} 
                            />

                            <Route 
                                path="/recipes/edit/:id" 
                                element={
                                    <ProtectedRoute>
                                        <CreateRecipePage />
                                    </ProtectedRoute>
                                } 
                            />
                            
                            {/* Fallback 404 Route */}
                            <Route 
                                path="*" 
                                element={
                                    <div className="flex flex-col items-center justify-center h-full mt-24">
                                        <h1 className="text-4xl font-bold text-gray-900">404</h1>
                                        <p className="text-gray-600 mt-2">Page not found</p>
                                    </div>
                                } 
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
