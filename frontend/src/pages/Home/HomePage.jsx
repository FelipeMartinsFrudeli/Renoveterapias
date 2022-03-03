import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductComponent from '../../components/productComponent';

import './HomePage.css'


function HomePage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);

    const backend_url = 'http://localhost:5000' //http://localhost:5000  https://app-teste256.herokuapp.com

    const fetchData = async () => {
        const response = await fetch(`${backend_url}/products/0/20`);
        const newData = await response.json();
        setProduct(newData)
        setLoading(false)
        console.log('1')
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesPerRow: 4,
      };
      
    useEffect(() => {
       fetchData();
    }, [])

    
    return (
        <div>
            <div className='bem-vindo'>
                <p className='title'>Seja bem vindo a Renoveterapias!</p>
                <p className='subtitle'>Aparelho capaz de descobrir as disfunções do organismo</p>
                <button className='more'>Saiba mais</button>
            </div>
            <div className='sobre'>
                <div className='collum1'>
                    <p className='title'>SOBRE A <a className='greenFont'> RENOVE TERAPIAS</a></p>
                    <p className='subtitle'>Transformar você em sua melhor versão, de forma natural</p>
                    <button className='more'>Saiba mais ...</button>
                </div>
                <div className='collum2'>
                    <div className='text1'>
                        <p className='subtitle'>Ajudamos você a encontrar o equilíbrio de sua saúde física e mental</p>
                        <p className='subtitle'>com muito amor, paixão e entrega no que fazemos.</p>
                    </div>
                    <div className='text2'>
                        <p className='subtitle'>Sabe quando algo não está bem, mas você não sabe o que é exatamente?</p>
                    </div>
                </div>
            </div>
            <div className='produtos'>
            
                <p className='title'>NOSSOS <a className='greenFont'> PRODUTOS</a></p>
                <div className='grid-home'>
                <Slider {...settings} >
                    {/* <ProductComponent name={nameProduct} price={priceProduct} image={imageProduct} /> */}
                    {Object.keys(product).map(function(object, index) {
                        if(loading) {return} else {
                            return <div><ProductComponent name={product[object].name} price={product[object].price} image={`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/${window.location.href.split('/')[3]}${product[object].url_image}`} key={index.toString()} id={product[object]._id} /></div>

                        }
                    })}
                </Slider>
                </div>
            </div>
            <div className='saiba-mais'>
                <div className='line-detail'></div>
                <div className='image'>
                    <div className='box'>
                        <p className='title'><a className='greenFont'>OQUE A RENOVE TERAPIAS,</a> PODE FAZER POR VOCÊ?</p>
                        <p className='subtitle'>Transformar você em sua melhor versão, de forma natural</p>
                        <button className='more'>Saiba mais</button>
                    </div>
                </div>
            </div>
            <div className='artigos'>Home</div>
        </div>
    )
}

export default HomePage