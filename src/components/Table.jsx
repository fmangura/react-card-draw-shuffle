import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import axios from 'axios';
import './Table.css'

// async function getDeck() {
//     const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
//     setCurrDeckId(res.data.deck_id);
// }

const Table = () => {
    const [currDeckId, setCurrDeckId] = useState('');
    const [cardPile, setCardPile] = useState([]);
    const [count, setCount] = useState(-1);

    useEffect(() => {
        if (count > -1 && count <= cardPile.length - 1){
            let interval = setInterval(function() {setCount(count => count + 1)},250);
            document.getElementById(`${cardPile[count].card}`).classList.add('shuffle');
            document.getElementById(`secondBack`).classList.add('shuffleBack');
            return () => clearInterval(interval);
        } 
        
        if (count > cardPile.length - 1 ) {
            setTimeout(function() {
                document.getElementById(`secondBack`).classList.remove('shuffleBack');
                setCardPile([]);
                setCurrDeckId('');
                setCount(-1);
            },750);
        }
    },[count])

    useEffect(() => {
        if (!currDeckId) {
            async function getNewDeck() {
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
                setCurrDeckId(res.data.deck_id);
            }
            getNewDeck();
        }
    },[currDeckId]);

    const shuffle = () => {
        setCount(count => count + 1);
    };

    const getCard = async function () {
        const res = (await axios.get(`https://deckofcardsapi.com/api/deck/${currDeckId}/draw/?count=1`));

        if(!res.data.success) {
            shuffle();
        } else {
            const {code, image} = res.data.cards[0]
            setCardPile(() => [...cardPile, {card:code, img:image, classes:'playingCard'}]);
        }
    }

    return (
        <div>
            <div className='cardPile' style={{marginBottom:'10px'}}>
                <img src='https://deckofcardsapi.com/static/img/back.png' id='firstBack'/>
                <img src='https://deckofcardsapi.com/static/img/back.png' id='secondBack'/>
                {cardPile.map(({card, img, classes}) => <Card key={card} img={img} classes={classes} card={card} />)}
            </div>
            <button onClick={getCard}>Draw</button>
            <button id='shuffleBtn' onClick={shuffle} >Shuffle</button>
        </div>
    )

}

export default Table;