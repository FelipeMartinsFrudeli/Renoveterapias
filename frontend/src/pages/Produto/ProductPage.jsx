import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import parse from "html-react-parser";

import {TiShoppingCart} from 'react-icons/ti';

import './ProductPage.css'

export default function ProductPage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [image, setImage] = useState();

    let { id } = useParams();

    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/product/${id}`);
        const newData = await response.json();
        setProduct(newData)
        setLoading(false)
        //console.log(newData.url_image)
        setImage(newData.url_image)
    };

    useEffect(() => {
       fetchData();
    }, [])

    return (
        <div className='ProductPage'>
            <div className='line-detail'></div>
            <div className='Product'>
                <div className="collum1">
                    <img src={`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/${image}`} className='imagem-produto' alt=''/>
                </div>
                <div className="collum2">
                    <p className='nome-produto'>{product.name}</p>
                    <p className='preco-produto'>R$ {product.price}</p>
                    <p className='detail-produto'>R$ {product.details}</p>
                    <button className="buy-button style-button">Comprar</button>
                    <button className="add-to-cart-button style-button">
                        <div>
                            Adicionar no carrinho
                            <TiShoppingCart className="add-to-cart-icon" />
                        </div>
                    </button>
                </div>
            </div>
            
            <div className='descricao-produto'>
                <div className='line'></div>
                <p className='title'>Descrição</p>
                <p className='text'>{parse(`${product.description}`)}</p>
            </div>
            
        </div>
    )
}