import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages=[
   {"src":"/images/king.png",matched:false},
   {"src":"/images/queen.png",matched:false},
   {"src":"/images/ace.png",matched:false},
   {"src":"/images/j.png",matched:false},
   {"src":"/images/9card.png",matched:false},
   {"src":"/images/10card.png",matched:false}
]

function App() {
  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)
  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)

  //shuffle cards
  const shuffleCards=()=>{
    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }
  // console.log(cards,turns);
  //handle a choice
  const handleChoice=(card)=>{
   choiceOne?setChoiceTwo(card):setChoiceOne(card)
  }

  useEffect(()=>{
 if(choiceOne && choiceTwo){
  if(choiceOne.src===choiceTwo.src){
      setCards(prevCards=>{
        return prevCards.map(card=>{
          if(card.src===choiceOne.src){
            return{...card,matched:true}
          }else{
            return card
          }
        })
      })
    resetTurn()
  }else{
    
   setTimeout(()=>resetTurn(),1000) 
  }
 }
  },[choiceOne,choiceTwo])
  console.log(cards);

  //reset choices and increment turn
  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns=>prevTurns+1)
  }

  return (
    <div className="App">
      <h1>Memory test</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {
          cards.map(card=>(
           <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card===choiceOne || card===choiceTwo ||card.matched}/>
          ))
        }
      </div>
    </div>
  );
}

export default App;
