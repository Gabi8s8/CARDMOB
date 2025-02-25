import React from 'react';
import { useState } from 'react';

const Atividade1 = () => {
  let [name, setName] = useState('Visitante')

  return (
    <>
      <div>
        <input type="text" placeholder="Qual seu nome?" id="name"></input>
        <button onClick={() => {
          document.getElementById('name').value
          if (name != "") {
              setName(document.getElementById('name').value)
          } else {
            setName('Visitante');
          }
        }
        }>Enviar</button>
        <p>Olá {name}!</p>
      </div>
    </>
  );

}

export default Atividade1;
