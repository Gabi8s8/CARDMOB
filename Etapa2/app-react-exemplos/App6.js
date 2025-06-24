import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    FlatList,
    Alert,
} from 'react-native';

// Indicar o enderço do backend
const BASE_URL = 'http://10.81.205.28:3000';

export default function App() {
    // CRUD em memória
    const [shoppingList, setShoppingList] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [editItemName, setEditItemName] = useState('');
    const [editItemAmount, setEditItemAmount] = useState(null);
    // loading ... efeito de carregando
    const [loading, setLoading] = useState(false);

    // Burcar tudo
    const fetchItemsList = async () => {
        setLoading(true);
        try {
            // executa oq precisa, se der erro entra no catch
            const response = await fetch(`${BASE_URL}/compras`); // await: aguarda a resposta antes de ir pra proxima linha
            const data = await response.json(); // converte a resposta em JSON
            console.log(JSON.stringify(data)); // debug
            setShoppingList(data); // atualiza o estado com os dados recebidos
        } catch (error) {
            // quando ocorre algum erro
            console.error('Error fetching shopping:', error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItemsList()
    }, []); // [] significa que o efeito só roda uma vez, quando o componente é montado

    // Create
    const addItem = async () => {
        if (name.trim() === '' || amount.toString().trim() === '') {
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/compras`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name.trim(), amount: parseInt(amount) }),
            })
            if (response.ok) {
                await fetchItemsList(); // Atualiza a lista de itens após adicionar
                setName(''); // Limpa o campo de texto
                setAmount(null); // Reseta a quantidade para 1
            } else {
                console.error('Failed to add items:', response.status);
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }

    };

    // Update
    const updateItem = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/compras/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: editItemName, amount: editItemAmount }),
            });
             if (response.ok) {
                await fetchItemsList(); // Atualiza a lista de itens após editar
                setEditItemId(null);
                setEditItemName('');
                setEditItemAmount(null);
            } else {
                console.error('Failed to update item:', response.status);
            }
        }
        catch (error) {
            console.error('Error updating item:', error);
        }
    };

    // Delete
    const deleteItem = async (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel', },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const response = await fetch(
                                `${BASE_URL}/compras/${id}`,
                                {
                                    method: 'DELETE',
                                }
                            );
                            if (response.ok) {
                                await fetchItemsList(); // Atualiza a lista de itens após deletar
                            } else {
                                console.error(
                                    'Failed to delete item:',
                                    response.status
                                );
                            }
                        } catch (error) {
                            console.error('Error deleting item:', error);
                        }
                    },
                },
            ],
            { cancelable: true } // permite cancelar o alerta
        );
    };

    // Read -> um unico item e/ou lista de itens
    const renderItem = ({ item }) => {
        if (item.id != editItemId) {
            return (
                <View style={styles.item}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={styles.itemText}>Item: {item.name}</Text>
                        <Text style={styles.itemText}>Amount: {item.amount}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            title="Edit"
                            onPress={() => {
                                setEditItemId(item.id);
                            }}
                            color={'pink'}
                        ></Button>
                        <Button
                            title="Delete"
                            onPress={() => deleteItem(item.id)}
                            color={'pink'}
                        ></Button>
                    </View>
                </View>
            );
        } else {
            // Um item está sendo editado
            return (
                <View style={styles.item}>
                    <TextInput
                        placeholder="Name"
                        style={styles.editInput}
                        onChangeText={setEditItemName}
                        value={editItemName}
                        autoFocus
                    />
                    <TextInput
                        placeholder="Amount"
                        style={styles.editInput}
                        onChangeText={setEditItemAmount}
                        value={editItemAmount}
                        autoFocus
                    />
                    <Button
                        title="Update"
                        onPress={() => updateItem(item.id)}
                        color={'pink'}
                    ></Button>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Shopping List</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name item"
            />
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount item"
            />
            <Button title="Add Item" onPress={addItem} color={'pink'} />
            <FlatList
                data={shoppingList}
                renderItem={renderItem} // cada item da lista (items) vai ser processado
                keyExtractor={(item) => item.id} // retorna o id do item
                style={styles.list}
            />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
        padding: 20,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'cursive',
        textAlign: 'center',
        color: '#B03060',
        margin: 10
    },
    buttonContainer: {
        marginTop: 12,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    itemText: {
        flex: 1,
        marginRight: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    editInput: {
        flex: 1,
        marginRight: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});