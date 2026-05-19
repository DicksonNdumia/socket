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
        console.log(message);

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

