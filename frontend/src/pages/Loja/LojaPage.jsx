import React, { useEffect, useState } from 'react'

import ProductComponent from '../../components/productComponent';
import './LojaPage.css';

function LojaPage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);

    let totalProductsLocal = 0

    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/products/0/16`);
        const TotalProducts = await fetch(`http://localhost:5000/productsTotal`);
        const newData = await response.json();
        const total = await TotalProducts.json();
        setProduct(newData)
        setLoading(false)
        setTotalProducts(total)
        console.log(total, typeof(total))
    };

    useEffect(() => {
       fetchData();
    }, [])


    return (
        <div className='container-loja-page'>
            <div className='line-detail'>
                <div className='text-line-detail'>Nossos produtos</div>
            </div>
            <div className='totalResults'>Exibindo 1 - 16 de {totalProducts} resultados</div>
            <div className='products-grid'>
                    {/* <ProductComponent name={nameProduct} price={priceProduct} image={imageProduct} /> */}
                    {Object.keys(product).map(function(object, index) {
                        if(loading) {return} else {
                            return <ProductComponent name={product[object].name} price={product[object].price} image={product[object].url_image} key={index.toString()} id={product[object]._id} />
                        }
                    })}
                </div>
        </div>
    )
}

export default LojaPage;