import React from 'react'
import { Link } from 'react-router-dom';

import { AiOutlineMessage, AiOutlineHeart, AiOutlineArrowRight } from 'react-icons/ai';

import ArticleComponent from '../../components/articleComponent';
import './ArticlesPage.css';


function ArticlesPage(props) {
    
    return (
        <div className='container-article'>
            <div className='articles'>
                <div className='first-article'>
                    <div className='text-collumn-article'>
                        <div className='title-article'>Alcachofra: 7 benefícios e como consumir</div>
                        <div className='date-article'>março 3, 2022</div>
                        <div className='description-article'>A alcachofra, é uma planta medicinal rica em água, fibras e flavonoides, além de ter boas quantidades de vitamina C e minerais, como o potássio e fósforo, tendo ação antioxidante, anti-inflamatória, diurética, probiótica e antidispéptica (combate a má digestão).</div>
                        <div className='collum-buttons-article'>
                            <button><AiOutlineHeart/> Like</button>
                            <button><AiOutlineMessage/> Postar um comentário</button>
                            <div className='read-more-button'><button>LER MAIS <AiOutlineArrowRight/></button></div>
                        </div>
                    </div>
                    <div className='image-collumn-article'>
                        <img className='image-article' src={`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/${window.location.href.split('/')[3]}/images/Artigos/alcachofra_photo.png`}/>
                    </div>
                </div>
                <p className='title-default-section'>ARTIGOS RECENTES</p>
                <ArticleComponent/>
                <ArticleComponent/>
                <ArticleComponent/>
            </div>
            <div className='profile'>
                <div className='div-image-profile'>
                    <img src={`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/${window.location.href.split('/')[3]}/images/Artigos/profile-photo.png`}/>
                </div>
                <p className='title-profile'>Nós somos a Renoveterapia</p>
                <div className='description-profile'>Nosso Propósito é Transformar você em sua melhor versão, de forma natural.
                                    Ajudamos você a encontrar o equilíbrio de sua saúde física e mental com muito amor, paixão e entrega no que fazemos.
                                    Tenha a certeza que estaremos com nosso foco em nosso propósito, para que você esteja cada vez melhor!</div>
            </div>
        </div>
    );
}

export default ArticlesPage;