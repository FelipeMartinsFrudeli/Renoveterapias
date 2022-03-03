import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import {TiShoppingCart} from 'react-icons/ti';

import './Toolbar.css'

function Toolbar() {

    const [lastCheckbox, setLastCheckbox] = useState(false);

    function checkbox(event) {
        const button = event.target

        const withoutBorder = "background-color: #fff;text-decoration: none;border: none;color: #515151;padding: 0 1.4vw;font-size: 1.2vw;display:grid;justify-content:center;"
        if(lastCheckbox == false) {
            document.getElementById("home").style = withoutBorder
        } else {
            lastCheckbox.style = withoutBorder
        }

        const withBorderStyle = "background-color: #7AD03A;color: #fff;"

        if(button.nodeName == 'DIV') {
            button.parentNode.style = withBorderStyle
            setLastCheckbox(button.parentNode)
        } else {
            if(button.classList[0] == 'button') {
                button.style = withBorderStyle
                setLastCheckbox(button)
            }
        }
    }

    console.log(window.location.href.split('/')[0], window.location.href.split('/'))

    return (
        <div className='container'>
            <div className='line'></div>
            <div className='Toolbar'>
                <div className='logo'>
                    <img src={`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/${window.location.href.split('/')[3]}/images/logo-toolbar.svg`} className='logo-toolbar' alt=''/>
                </div>
                <div className='button-frame'>
                    <Link to="/Renoveterapias/" onClick={checkbox} id="home" className='button withBorder'><div className='text'>Home</div></Link>
                    <Link to="/Renoveterapias/Loja" onClick={checkbox} className='button'><div className='text'>Loja</div></Link>
                    <Link to="/" onClick={checkbox} className='button'><div className='text'>Sobre nós</div></Link>
                    <Link to="/" onClick={checkbox} className='button'><div className='text'>Contato</div></Link>
                    <Link to="/Renoveterapias/Artigos" onClick={checkbox} className='button'><div className='text'>Artigos</div></Link>
                    <Link to="/" onClick={checkbox} className='button'><div className='text'>Log In</div></Link>
                    <Link to="/" onClick={()=>console.log('teste')} className='button'><div className='text'><TiShoppingCart className="cart-icon" /></div></Link>
                </div>
            </div>
        </div>
    )
}

export default Toolbar