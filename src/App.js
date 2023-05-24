import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/View';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import Connecter from './pages/Connecter';
import Inscription from './pages/Inscription';
import Tos from './pages/Tos';

function App() {
    return (
        <>
            <div className="App">
                <Header />
                <ToastContainer position="top-center" />
                <Routes>
                    <Route path="/accueil" element={<Home />} />
                    <Route path="/add" element={<AddEdit />} />
                    <Route path="/update/:id" element={<AddEdit />} />
                    <Route path="/view/:id" element={<View />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/firebase" element={<Connecter />} />
                    <Route path="/register" element={<Inscription />} />
                    <Route path="/tos" element={<Tos />} />
                </Routes>
            </div>
        </>
    );
}

export default App;