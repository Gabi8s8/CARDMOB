import React from "react";
import { useState } from "react";

const Contador = () => {
    let [number, setNumber] = useState(0)

    return (
        <>
            <div>
                <p>{number}</p>
                <button onClick={
                    () => {
                        setNumber(number++)
                    }
                }>Incrementar</button>

                <button onClick={
                    () => {
                        setNumber(number--)
                    }
                }>Decrementar</button>
            </div>
        </>
    )
}

export default Contador;