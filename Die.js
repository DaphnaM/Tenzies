import React from "react"

export default function Die(props){
    return (
        <div  
            key={props.id} 
            className={props.held? "die-hold":"die-face"}
            onClick={()=> props.holdDie(props.id)}>
            <h2>{props.value}</h2>
        </div>
    )
}