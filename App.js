import React from "react"
import Die from "./Die"
import Confetti from 'react-confetti'



export default function App(){
    const [dies, setDies] = React.useState(newGameDie);
    const [tenzies, setTenzies] = React.useState(false)
    
    //console.log(dies)
    React.useEffect(()=>{
        
        const firstDie = dies[0].value
        const equal = dies.every(die => die.value === firstDie)
        if(equal) setTenzies(true)
        
    },[dies])
    
    function newGameDie(){
        //setTenzies(false)
        const diesArr =[]
        for(let i=0; i<10; i++){
            const newDie = {
                value: randomDie(),
                held: false,
                id: i+1 
            }
            diesArr.push(newDie)
        }
        
        return diesArr
    }
    
    function holdDie(dieId){
            setDies(prevDies =>{
               const newDies= prevDies.map(die => die.id === dieId ? {...die, held: true} : die )
                return newDies
            
            })
        }
    function randomDie(){
        return Math.ceil(Math.random()*6)
    }
    function rollDice(){
       tenzies ? setDies(newGameDie) :  
       setDies(prevDies => {
           const newArr = prevDies.map((die)=> die.held ? die :{...die, value: randomDie()})
           return newArr
       }) 
    }
    function playAgain(){
        setTenzies(false)
        setDies(newGameDie)
        
    }
    const dieElements = dies.map(die => 
        <Die 
            key={die.id} 
            {...die}
            holdDie ={holdDie}
            />)
            
    return (
        <main className="background">
        {tenzies && <Confetti />}
        
            <h1>Tenzies</h1>
            <p>Roll die until the same. Click to freeze a die</p>
            <div className="die-container">
                {dieElements}
            </div>
            <button className="button" onClick={tenzies ? playAgain : rollDice}>{tenzies ? "Play again": "Roll dice"}</button>
        
        </main>
        )
}