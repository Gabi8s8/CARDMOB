import { React, useState } from "react";
import ProductCard from './ProductCard';
import '../../src/Product.css';

const ProductList = () => {
    const [produto, setProduto] = useState([]);
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingNome, setEditingNome] = useState('');
    const [editingPreco, setEditingPreco] = useState('')

    const addProduto = () => {
        if (nome.trim() !== '' && preco.trim() !== '') {
            setProduto([...produto, { id: Date.now(), nome: nome, preco: preco }]);
            setNome('');
            setPreco('');
        }
    };

    const startEditing = (id, nome, preco) => {
        setEditingId(id);
        setEditingNome(nome);
        setEditingPreco(preco);
    };

    const saveEdit = () => {
        setProduto(
            produto.map(
                (item) =>
                    item.id === editingId
                        ? { ...item, nome: editingNome, preco: editingPreco } // atualiza
                        : item // se não, retorna o item original
            )
        );
        setEditingId(null);
        setEditingNome('');
        setEditingPreco('');
    };

    const delProduto = (id) => {
        setProduto(produto.filter((item) => item.id !== id));
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingNome('');
        setEditingPreco('');
    };

    return (
        <>
            <div className="add">
                <h2>Adicionar produto:</h2>
                <input
                    placeholder="Nome:"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
                <button onClick={addProduto}>Adicionar</button>
            </div>

            <div className='Product-list'>
                <h2>Lista de produtos</h2>
                <ul>
                    {produto.map((item) => (
                        <li key={item.id}>
                            {editingId === item.id ? (
                                <>
                                    <input
                                        placeholder="Novo nome"
                                        value={editingNome}
                                        onChange={(e) =>
                                            setEditingNome(e.target.value)
                                        }
                                    />
                                    <input
                                        placeholder="Novo preco"
                                        value={editingPreco}
                                        onChange={(e) =>
                                            setEditingPreco(e.target.value)
                                        }
                                    />
                                    <button onClick={saveEdit}>Salvar</button>
                                    <button onClick={cancelEditing}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                <div className="card">
                                    <ProductCard item={item} />
                                    <button
                                        onClick={() =>
                                            startEditing(
                                                item.id,
                                                item.nome,
                                                item.preco
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button onClick={() => delProduto(item.id)}>
                                        Excluir
                                    </button>
                                </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

}

export default ProductList;