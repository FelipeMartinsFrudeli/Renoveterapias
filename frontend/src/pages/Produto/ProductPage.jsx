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

    const backend_url = 'http://localhost:5000' //http://localhost:5000  https://app-teste256.herokuapp.com
    
    const fetchData = async () => {
        const response = await fetch(`${backend_url}/product/${id}`);
        const newData = await response.json();
        setProduct(newData)
        setImage(newData.url_image)
        setLoading(false)
    };

    const setParagraph = React.useMemo(() => {
        if(typeof(product.description) != 'undefined') {
            product.description.split('<br/>').map((value, index) => {
                const paragraph = document.createElement('p');
                const text = document.createTextNode(value);
                paragraph.appendChild(text);
                console.log(paragraph)
                document.getElementById('textDescription').appendChild(paragraph)
                //return paragraph
            })
        }
    }, [product.description]);
    

    /* const setDescription = () => {
        if (!loading) {
            setParagraph()
        } else {
            let index = 0
            function checkState() {
                if(loading && index <= 20) {
                    index++
                    setTimeout(checkState, 200);
                } else { setParagraph() }
            }
            checkState()
        }
    } */

    useEffect(() => {
       fetchData();
       window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    //parse(`${product.description}`)

    return (
        <div className='ProductPage'>
            <div className='line-detail'></div>
            <div className='Product'>
                <div className="collum1">
                    <img src={`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/${window.location.href.split('/')[3]}${image}`} className='imagem-produto' alt=''/>
                </div>
                <div className="collum2">
                    <p className='nome-produto'>{product.name}</p>
                    <p className='preco-produto'>R$ {product.price}</p>
                    <p className='detail-produto'>{product.details}</p>
                    <p className='tags-produto'>Tags: {product.Tags}</p>
                    <p className='category-produto'>Categorias: {product.category}</p>
                    <Link className="buy-button style-button" to="/Renoveterapias">Comprar</Link>
                    <Link to="/Renoveterapias" className="add-to-cart-button style-button">
                        Adicionar no carrinho
                        <TiShoppingCart className="add-to-cart-icon" />
                    </Link>
                </div>
            </div>
            
            <div className='descricao-produto'>
                <div className='line'></div>
                <p className='title'>Descrição</p>
                <p className='text' id="textDescription">{}</p>
            </div>
            
        </div>
    )
}