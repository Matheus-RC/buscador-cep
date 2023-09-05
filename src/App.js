import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css'

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [whiteFrame, setwhiteFrame] = useState(false);

  async function handleSearch(){
    if(input === ''){
      alert("Preencha algum cep!");
      return;
    }

    try{
      const response = await api.get(input+'/json');
      setCep(response.data);
      setInput('');
      setwhiteFrame(true);
    }catch{
      alert("Erro ao buscar!");
      setInput('');
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Digite seu CEP..."></input>
        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={25} color="#fff"/></button>
      </div>

      {whiteFrame ? (
      <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>Rua: {cep.logradouro}</span>
        {cep.complemento !== "" ?(
        <span>Complemento: {cep.complemento}</span>
        ): null}
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      ): null}
    </div>
  );
}

export default App;
