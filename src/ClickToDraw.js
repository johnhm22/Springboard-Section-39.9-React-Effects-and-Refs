import React, {useState, useEffect, useRef} from "react";
import { v4 as uuid} from 'uuid';
import axios from "axios";
import'./ClickToDraw.css'

const ClickToDraw = (props) => {

    console.log("props: ", props);
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

    // console.log("cards: ", cards);

    const addCard = card => {
        setCards(cards => [...cards, {id:uuid(), card}]);
    }
    
    useEffect(() => {
        console.log("useEffect called");
        async function drawCard() {
            console.log("deckId in useEffect is: ", deckId);
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            console.log("image: ", res.data.cards[0].image);
            const card = res.data.cards[0].image
            console.log("props.total is now: ", props.total)
            addCard(card)
        }
        drawCard();
    },[props.total, deckId])

    // <button onClick={handleNewCard}>Draw card</button>


    return (
        <div className="cardframe">
            {cards.map(c => (
                <div className="cardpostion">
                    <img alt="A selection of playing cards" src={c.card}></img>
                </div>
            ))}
        </div>
    )
}

export default ClickToDraw;