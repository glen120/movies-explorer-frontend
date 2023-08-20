import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main/Main';
import Register from '../Register/Register';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signup' element={<Register />} />
    </Routes>
  );
}