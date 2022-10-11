import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [link_webhook, setLink_webhook] = useState('');
  const [link_avatar, setLink_avatar] = useState('');
  const [msg, setMsg] = useState('');
  const [username, setUsername] = useState('');
  
  async function enviar_mensagem() {
    let obj = await (await fetch(link_webhook)).json();

    const httpClient = axios.create({ baseURL: `https://discord.com/api/webhooks`});
    
    let msg_json = {
      "content": msg,
      "username": username,
      "avatar_url": link_avatar
    }
    
    console.log(`/${obj.id}/${obj.token}`)

    httpClient.post(`/${obj.id}/${obj.token}`, msg_json);

    console.log(obj.id)
    console.log(obj.token)
  }
  
  return (
    <div className="App">
        <label>{'Link do webhook: '}</label>
        <input type="text"
            onChange= {e => setLink_webhook(e.target.value)}
            className="form-control"
            id="webhook-link"
            placeholder='Insira o link do webhook' />
        <br/>

        <label>{'Link do avatar: '}</label>
        <input type="text"
            onChange= {e => setLink_avatar(e.target.value)}
            className="form-control"
            id="avatar_url"
            placeholder='Insira o link do avatar' />
        <br/>

        <label>{'Username: '}</label>
        <input type="text"
            onChange= {e => setUsername(e.target.value)}
            className="form-control"
            id="username"
            placeholder='Insira um nome para o bot' />
        <br/>

        <label>{'Mensagem: '}</label>
        <input type="text"
            onChange= {e => setMsg(e.target.value)}
            className="form-control"
            id="Mensagem"
            placeholder='Digite a mensagem' />
        <br/>

        <button onClick={enviar_mensagem}
            className='btn btn-danger'>
            <i className='pi pi-plus' /> Enviar mensagem
        </button>
    </div>
  )
}

export default App
