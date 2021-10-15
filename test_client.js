//  Hello World client
const zmq = require('zeromq');

async function runClient() {
    console.log('Connecting to hello world server…');

    //  Socket to talk to server
    const sock = new zmq.Request();
    sock.connect('tcp://192.168.11.3:5556');

    for (let i = 0; i < 10; i++) {
        console.log('Sending Hello ', i);
        await sock.send('Hello');
        const [result] = await sock.receive();
        console.log('Received ', result.toString(), i);
    }
}

runClient();
