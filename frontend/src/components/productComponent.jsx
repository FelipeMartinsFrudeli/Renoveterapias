import React from 'react'
import { Link } from 'react-router-dom';

function productComponent(props) {
    const name = props.name;
    const price = props.price;
    const image = props.image;
    const id = props.id;
      return (
        <div className='produto'>
            <img src={image} className='imagem-produto' alt=''/>
            <p className='nome-produto'>{name}</p>
            <p className='preco-produto'>R$ {price}</p>
            <Link to={`/produto/${id}`} className='comprar-produto'><div className='text'>Comprar</div></Link>
        </div>
    );
}

export default productComponent;