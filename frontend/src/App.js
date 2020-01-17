import React, { useEffect, useState } from 'react';

import api from "./services/api"
import DevItem from "./components/DevItem"
import DevForm from "./components/DevForm"

import "./Global.css"
import "./App.css"
import "./Sidebar.css"
import "./Main.css"

// Componente: Bloco isolado de HTML, CSS, JS, o qual não interfere o restante de aplicação.
// Estado: Informações mantidas pelo componentes (Lembrar: Imutabilidade)
// Propriedade: Informações que um componente PAI passa para o componente FILHO

function App() {

  const [devs, setDevs] = useState([])

  useEffect(() => {
      async function loadDevs(){
        const response = await api.get("/devs")
        setDevs(response.data)
      }
      loadDevs()
  },[])

  async function handleSubmit(data){
    const response = await api.post("/devs", data)
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
