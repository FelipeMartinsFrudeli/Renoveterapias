import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import ArticlePage from './pages/Artigos/ArticlesPage';
import HomePage from './pages/Home/HomePage';
import LojaPage from './pages/Loja/LojaPage';
import ProductPage from './pages/Produto/ProductPage';

export default function App() {
    return (
        <Router>
            <Toolbar/>
            <Routes>
                <Route path="/Renoveterapias/" exact element={<HomePage/>} />
                <Route path="/Renoveterapias/Loja" exact element={<LojaPage/>} />
                <Route path="/Renoveterapias/Artigos" exact element={<ArticlePage/>} />
                <Route path="/Renoveterapias/Produto/:id" exact element={<ProductPage/>} />
            </Routes>
        </Router>
    )
}