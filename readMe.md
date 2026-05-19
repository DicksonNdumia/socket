### Introduction to websockets


### installing libraries and installing dependencies required
installing the websocket library

```bash
npm install ws
```

### dependencies

```bash
npm install --save-dev @types/node @types/ws
```

### starting our first websocket server
```js
import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

//ready state types
// 0: connecting
// 1: Open (The only state where you can safely send())
// 2:  Closing
// 3: Closed



//connection event
wss.on('connection', ( socket, request)=> {
    const  ip = request.socket.remoteAddress;

    socket.on('message', (rawData)=> {
        const message = rawData.toString();
        console.log({rawData});

        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN) client.send(`Server BroadCast: ${message}`);
        })
    })
    socket.on('error', (err)=> {
        console.error(`ERROR: ${err.message}: ${ip}`);
    });

    socket.on('close', () => {
       console.log('Client disconnected');
    })
})

console.log('Server started on ws://localhost:8080 ')
```


#### Testing if the serve is on
> we can use the browser through inspect on the console and write the js code to test
```js
const socket = new WebSocket('ws://localhost:8080');
socket.onmessage= (event) => {
    console.log(`Message from the server:`, event.data)
}
socket.onopen = () => {
    socket.send('Hello from chrome');

}
```
### Testing using ws-cat
> first we install the ws libray
```bash
npm install -g wscat
```
> Running it by running in bash with:
```bash
wscat -c ws://localhost:8080
```

### examples of event listeners in Sockets
```js
 const statusEl = document.getElementById('status');
    const log = document.getElementById('log');
    const input = document.getElementById('message-input');
    // initiate the handshake
    const socket = new WebSocket('ws://localhost:8080');

    const  appendLog = (label, message) => {
        const entry = `${new Date().toLocaleTimeString()} ${label} ${message}\n`;
        log.textContent = entry + log.textContent;
    }

    socket.addEventListener('open', ()=> {
        statusEl.textContent= 'Connected: ws://localhost:8080';
        statusEl.className='status-on';
        appendLog('[SYSTEM]', 'Tunnel Established.')

    });

    socket.addEventListener('close', ()=> {
        statusEl.textContent= 'Disconnected';
        statusEl.className='status-off';
        appendLog('[SYSTEM]', 'Tunnel Dead.')

    });

    socket.addEventListener('message', (e)=> {
        appendLog('[Received]',e.data);
    })
```
 
