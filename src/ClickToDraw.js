import React, {useState, useEffect, useRef} from "react";
import { v4 as uuid} from 'uuid';
import axios from "axios";
import'./ClickToDraw.css'

const ClickToDraw = () => {

    const deckRef = useRef();
    deckRef.current = 'c6scgn7h37wq'
    const deckId = deckRef.current;

    // async function getDeckRef(){
    //     const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    //     deckRef.current = res.data.deck_id;
    //     console.log("deckRef in getDeckRef func: ", deckRef.current);
    //     return deckRef.current;
    // }

    // const deckId = getDeckRef();


    // const INITIAL_STATE = [{id: uuid(), image: "https://deckofcardsapi.com/static/img/5H.png"}];
    const INITIAL_STATE = [];
    
    const [cards, setCards] = useState(INITIAL_STATE);

    const [total, setTotal] = useState(52);

    const newCard = () => {
        setTotal(total => total -1)
    }

    // console.log("cards: ", cards);

    const addCard = card => {
        setCards(cards => [...cards, {id:uuid(), card}]);
    }
    
    useEffect(() => {
        async function drawCard() {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            const card = res.data.cards[0].image
            addCard(card)
        }
        drawCard();
    },[total, deckId])

    // <button onClick={handleNewCard}>Draw card</button>


    return (
        <div className="cardframe">
            <button onClick={newCard}>Draw card</button>
            {total === 0 && <h3>No cards remaining</h3>}
            {cards.map(c => (
                <div className="cardpostion">
                    <img alt="A selection of playing cards" src={c.card}></img>
                </div>
            ))}
        </div>
    )
}

export default ClickToDraw;