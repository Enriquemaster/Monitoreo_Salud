import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import  SeguimientoPasos  from './pages/SeguimientoPasos'; 
import  SeguimientoMapa  from './pages/SeguimientoMapa'; 

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
    <SeguimientoPasos />

  </React.StrictMode>
);