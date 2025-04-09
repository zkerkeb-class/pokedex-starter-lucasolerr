import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/registerForm'; // Importer le formulaire d'inscription

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = (data) => {
    navigate('/login'); // Redirige vers la page de login après inscription réussie
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Inscription</h2>
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        <p className="text-center text-gray-600 mt-4">
          Déjà un compte ?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Connectez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
