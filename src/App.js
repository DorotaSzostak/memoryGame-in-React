import React, { Component } from 'react';
import Cards from './Cards';

const CardState = {
    HIDING: 0,
    SHOWING: 1,
    MATCHING: 2
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

class App extends Component {
    constructor(props){
        super(props);
         let cards = [
              {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
              {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
              {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
              {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
              {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
              {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
              {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
              {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
              {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
              {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
              {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
              {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
              {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
              {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
              {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
              {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
        ];
        
        cards = shuffle(cards);
        this.state = {cards}
        this.restartGame = this.restartGame.bind(this);
        this.showCard = this.showCard.bind(this);
    }
    
    restartGame(e){
        let cards = this.state.cards.map(c => ({
            ...c,
            cardState: CardState.HIDING
        }));
        cards = shuffle(cards);
        this.setState({cards})
    }
    
    showCard(id){
       const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    }

    const foundCard = this.state.cards.find(c => c.id === id);
    
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    
    let noClick = false;
    
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    
    const showingCards =  cards.filter((c) => c.cardState === CardState.SHOWING);
    
    const ids = showingCards.map(c => c.id);
    
    if (showingCards.length === 2 &&
        showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      
      noClick = true;
      
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          this.setState({cards: hidingCards, noClick: false});
        }, 1300);
      });
      return;
    }
    
    this.setState({cards, noClick});
    }
    
    render(){
        const cards = this.state.cards.map((card)=>{
            return <Cards 
            key={card.id}
            showing={card.cardState !== CardState.HIDING}
            backgroundColor={card.backgroundColor}
            onClick={() => this.showCard(card.id)}
            />
        });
        return(
            <div>
            <h1>MEMORY GAME</h1>
            <h2 onClick={this.restartGame}>Start new game</h2>
            {cards}
            </div>
        )
    }
}

export default App;
