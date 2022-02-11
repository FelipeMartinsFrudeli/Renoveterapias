import React from 'react'

import Toolbar from '../../components/Toolbar/Toolbar';

import './HomePage.css'

function HomePage() {
    return (
        <div>
            <Toolbar/>
            <div className='bem-vindo'>
                <p className='title'>Seja bem vindo a RenoveTerapias!</p>
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
                <div className='produtos-grid'>
                    <div className='produto'>
                        <img src='./images/produtos/Pro-Zen-300x300.png' className='imagem-produto'/>
                        <p className='nome-produto'>PróZen – Cápsulas – 60 cápsulas – 680mg</p>
                        <p className='preco-produto'>R$ 51.90</p>
                        <button className='comprar-produto'>Comprar</button>
                    </div>
                    <div className='produto'>
                        <img src='./images/produtos/Mente-Urbana-300x300.png' className='imagem-produto'/>
                        <p className='nome-produto'>Mente Urbana – Cápsulas – 120 cápsulas – 700mg</p>
                        <p className='preco-produto'>R$ 51.90</p>
                        <button className='comprar-produto'>Comprar</button>
                    </div>
                    <div className='produto'>
                        <img src='./images/produtos/Q10-21h-300x300.png' className='imagem-produto'/>
                        <p className='nome-produto'>Q10 21h – Cápsulas – 60 cápsulas – 580mg</p>
                        <p className='preco-produto'>R$ 51.90</p>
                        <button className='comprar-produto'>Comprar</button>
                    </div>
                    <div className='produto'>
                        <img src='./images/produtos/Pro-Zen-300x300.png' className='imagem-produto'/>
                        <p className='nome-produto'>Óleo de Gérmen de Trigo – Cápsulas – 120 cápsulas softgel – 250mg</p>
                        <p className='preco-produto'>R$ 51.90</p>
                        <button className='comprar-produto'>Comprar</button>
                    </div>
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