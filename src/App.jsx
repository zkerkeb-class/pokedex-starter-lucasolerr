import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // Importer ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Importer les styles de Toastify

import Home from './screens/Home';
import PokemonDetail from './screens/PokemonDetail';
import CreatePokemon from './screens/CreatePokemon';
import EditPokemon from './screens/EditPokemon';
import PokemonForm from './components/pokemonForm';
import { AuthProvider } from './services/auth';
import Login from './screens/Login';
import Register from './screens/Register';
import PrivateRoute from './components/privateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/pokemon/:id" element={<PrivateRoute element={<PokemonDetail />} />} />
          <Route path="/create" element={<PrivateRoute element={<PokemonForm isEdit={false} />} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={<PokemonForm isEdit={true} />} />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}  // Toast disparaît après 5 secondes
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </AuthProvider>
  );
};

export default App;
