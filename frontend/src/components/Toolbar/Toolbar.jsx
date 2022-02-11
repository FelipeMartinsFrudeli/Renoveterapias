import React from 'react'

import './Toolbar.css'

function Toolbar() {
    return (
        <div className='container'>
            <div className='line'></div>
            <div className='Toolbar'>
                <div className='logo'>
                    <img src='./images/logo-toolbar.svg' className='logo-toolbar'/>
                </div>
                <div className='button-frame'>
                    <button className='button withBorder'>Home</button>
                    <button className='button'>Loja</button>
                    <button className='button'>Renoveterapias</button>
                    <button className='button'>Terapias</button>
                    <button className='button'>Contato</button>
                    <button className='button'>Home</button>
                    <button className='button'>Artigos</button>
                    <button className='button'>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Toolbar