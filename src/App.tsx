import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [link_webhook, setLink_webhook] = useState('');
  const [link_avatar, setLink_avatar] = useState('');
  const [msg, setMsg] = useState('');
  const [username, setUsername] = useState('');
  const [files, setFiles] = useState<any>();
  
  async function enviar_mensagem() {
    const form = new FormData();
    let cnt = 0;
    for (var i = 0; i < files.length; i++) {
      form.append(`file${i}`, files[i], files[i].name);
    }

    form.append('payload_json', JSON.stringify({
      "content": msg,
      "username": username,
      "avatar_url": link_avatar
    }))
    let obj = await (await fetch(link_webhook)).json();

    const httpClient = axios.create({ baseURL: `https://discord.com/api/webhooks`});

    httpClient.post(`/${obj.id}/${obj.token}`, form);
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

        <label>{'Arquivo: '}</label>
        <input type="file" multiple
            onChange= {e => setFiles(e.target.files)}
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
