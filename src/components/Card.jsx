import React, { userState } from 'react';
import './Card.css'

const Card = ({card, img}) => {


    return (
        <>
            {<img src={`${img}`} id={`${card}`} className='playingCard'/>}
        </>
    )

}

export default Card;