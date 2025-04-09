import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './screens/Home';
import PokemonDetail from './screens/PokemonDetail';
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
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
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
