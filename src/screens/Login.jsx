import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { toast } from 'react-toastify';
import LoginForm from '../components/loginForm';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (data) => {
    login(data.token); // stocke dans le contexte + localStorage
    navigate('/'); // Redirige vers la page d'accueil après une connexion réussie
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Connexion</h2>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <p className="text-center text-gray-600 mt-4">
          Pas encore de compte ?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Créez un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
