import React, { useState } from 'react';
import '../../src/contato.css';
import Contato from './Contato';

const ListaContato = () => {
    const [tudo, setTudo] = useState([]);
    const [cont, setCont] = useState('');
    const [nome, setNome] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingNome, setEditingNome] = useState('');
    const [editingCont, setEditingCont] = useState('')

    const addContato = () => {
        if (cont.trim() !== '' && nome.trim() !== '') {
            setTudo([...tudo, { id: Date.now(), nome: nome, contato: cont }]);
            setCont('');
            setNome('');
        }
    };

    const startEditing = (id, nome, cont) => {
        setEditingId(id);
        setEditingNome(nome);
        setEditingCont(cont)
    };

    const saveEdit = () => {
        setTudo(
            tudo.map((item) =>
                item.id === editingId
                   ? { ...item, nome: editingNome, contato: editingCont } // atualiza
                   : item // se não, retorna o item original
            )
        );
        setEditingId(null);
        setEditingNome('');
        setEditingCont('')
    };

    const delContato = (id) => {
        setTudo(tudo.filter((item) => item.id !== id));
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingNome('');
        setEditingCont('');
    };

    return (
        <>
            <div className="add">
                <h2>Adicionar contato:</h2>
                <input
                    placeholder="Nome:"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    placeholder="Telefone"
                    value={cont}
                    onChange={(e) => setCont(e.target.value)}
                />
                <button onClick={addContato}>Enviar</button>
            </div>

            <div>
                <h2>Lista de contatos</h2>
                <ul>
                    {tudo.map((item) => (
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
                                        placeholder="Novo telefone"
                                        value={editingCont}
                                        onChange={(e) =>
                                            setEditingCont(e.target.value)
                                        }
                                    />
                                    <button onClick={saveEdit}>Salvar</button>
                                    <a href="#" onClick={cancelEditing}>
                                        Cancelar
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Contato item={item} />
                                    <button
                                        onClick={() =>
                                            startEditing(
                                                item.id,
                                                item.nome,
                                                item.contato
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button onClick={() => delContato(item.id)}>
                                        Excluir
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ListaContato;
