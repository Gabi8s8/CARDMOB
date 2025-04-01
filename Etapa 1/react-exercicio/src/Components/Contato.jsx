import React from "react";

const Contato = ({ item }) => {
    console.log(item);
    return (
        <>
            <p>Nome: {item.nome}</p>
            <p>Contato: {item.contato}</p>
        </>
    );
}

export default Contato;