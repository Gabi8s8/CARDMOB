import React from 'react';

const ProductCard = ({ item }) => {
    return (
        <>
            <p>Nome: {item.nome}</p>
            <p>Preço: {item.preco}</p>
            <button>Adicionar ao carrinho</button>
        </>
    );
};

export default ProductCard;
