import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { BiHelpCircle } from 'react-icons/bi'

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
      <table>
      <tbody>
        <tr>
          <td>
            <label>{'Webhook link '}
            <span className='hovertext' 
              data-hover='To create a webhook, right click on the desired channel, select edit channel, integrations, see webhook and create a new one.'>
              <BiHelpCircle/>
            </span>
            </label>
          </td>
          <td>
            <input type="text" size={50}
                onChange= {e => setLink_webhook(e.target.value)}
                className="form-control"
                id="webhook-link" />
            </td>
        </tr> 
        <tr>
          <td>
            <label>{'Avatar link '}
              <span className='hovertext' data-hover='The easiest way is to upload your image to imgur, right click it and copy image link'><BiHelpCircle/></span>
            </label>
          </td>
          <td>
            <input type="text" size={50}
                onChange= {e => setLink_avatar(e.target.value)}
                className="form-control"
                id="avatar_url" />
          </td>
        </tr>

        <tr>
          <td>
            <label>{'Bot username'}</label>
          </td>
          <td>
            <input type="text" size={50}
                onChange= {e => setUsername(e.target.value)}
                className="form-control"
                id="username" />
          </td>
        </tr>
        <tr>
          <td>
            <br/>
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            Message:
          </td>
        </tr>

        <tr>
          {/* <td>
            <label>{'Message'}</label>
          </td> */}
          <td colSpan={2}>
            <textarea cols={64} rows={7} maxLength={2000}
                onChange= {e => setMsg(e.target.value)}
                className="form-control"
                id="Mensagem" />
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <input type="file" multiple
                onChange= {e => setFiles(e.target.files)}
                className="form-control"
                id="Mensagem" />
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <button onClick={enviar_mensagem} className="button">
                Send message
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
