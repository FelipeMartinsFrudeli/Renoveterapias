import React from 'react'
import { AiOutlineMessage, AiOutlineHeart, AiOutlineArrowRight } from 'react-icons/ai';

function articleComponent(props) {
      return (
        <div className="default-article">
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
    );
}

export default articleComponent;
