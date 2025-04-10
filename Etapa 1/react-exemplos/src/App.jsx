import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Counter from './components/Count';
import Photo from './components/Photo';
import Album from './components/Album';
import TodoList from './components/TodoList';

function App() {
  const [count, setCount] = useState(0);
  //cria as variáveis de estado para armazenar as fotos
  const [photos, setPhotos] = useState([]);
  const [albumId, setAlbumId] = useState(1);

  //método para buscar as fotos
  const fetchPhotos = async () => {
    try {
      //sistema para tratar erros
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
      const response = await fetch(url); //faz a requisição por padrão é GET

      if (response.status === 200) {
        const data = await response.json()
        const updatedPhotos = data.map( (photo) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?ramdom=${photo.id}`
        }))
        // ...photo { id: 1, title: "rotulo", thumbnailUrl: "http:/", ... }        
        // // { photo: { id: 1, title: "rotulo" } }

        setPhotos(updatedPhotos);
      }
    } catch (error) {
      console.error('Erro ao buscar fotos', error);
    }
  };

  useEffect(() => {
    fetchPhotos()
  }, [])

  return (
    <>
      <TodoList name="CARDMOB" />
      <Counter title="Contador Superior" />
      <Counter initial="77" />
      <article>
        <h1>Album da API</h1>
        {photos.map( (photo) => (
          // <article key={(photo.id)}>
          //     <h2> ID #{photo.id} {photo.title}</h2>
          //     <img src={photo.thumbnailUrl} alt={photo.title}/>
          // </article>   {/*map: pega todos os itens e retorna */}
          <Photo photo={photo}/>
        ))}      
      </article>
      <div>
        <button onClick={() => setAlbumId(1)}>Album #1</button>
        <button onClick={() => setAlbumId(2)}>Album #2</button>
        <button onClick={() => setAlbumId(3)}>Album #3</button>
        <button onClick={() => setAlbumId(4)}>Album #4</button>
      </div>

      <Album albumId={albumId} />
    </>
  );
}

export default App;
