const net = require('net');
const iso8583 = require('iso-8583');
const iso8583Packet = require('socketQueue/lib/iso8583-packet');
const Iso8583 = require('socketQueue/lib/iso8583');

// Set up sample test the ISO 8583 message data and custom formats for OpenWay vendor
let data = {
  0: "0100",
  2: "4761739001010119",
  3: "000000",
  4: "000000005000",
  7: "0911131411",
  12: "131411",
  13: "0911",
  14: "2212",
  18: "4111",
  22: "051",
  23: "001",
  25: "00",
  26: "12",
  32: "423935",
  33: "111111111",
  35: "4761739001010119D22122011758928889",
  41: "12345678",
  42: "MOTITILL_000001",
  43: "My Termianl Business                    ",
  49: "404",
  52: "7434F67813BAE545",
  56: "1510",
  123: "91010151134C101",
  127: "000000800000000001927E1E5F7C0000000000000000500000000000000014A00000000310105C000128FF0061F379D43D5AEEBC8002800000000000000001E0302031F000203001406010A03A09000008CE0D0C840421028004880040417091180000014760BAC24959"
};

let customFormats = {
  '3': {
    ContentType: 'n',
    Label: 'Processing code',
    LenType: 'fixed',
    MaxLen: 6
  }
};

// TODO: learn binary parsing using new method via isopack util of socketQueue lib validation
// let isopack = new iso8583Packet(data,customFormats);
// const isvalid = isopack.validateMessage();

// const isopackAsString = isopack.getBufferMessage();


// Create a server that listens on port 7777
const tcpSocket = net.createServer((socket) => {
  socket.on('data', (data) => {
    // TODO: manually try to parse the incoming binary buffer to a JSON object

    const incoming = new iso8583Packet(data)
    console.log('data', incoming);
    // Check the message type and handle the request appropriately

  });
});
tcpSocket.on('error', (err) => {
  throw err;
});

tcpSocket.on('listening', () => {
  console.log('Server listening on port 7778');
});

tcpSocket.on('connection', (socket) => {
  console.log('Client connected');
});

tcpSocket.listen(7778, 'localhost');

// Creating a client that connects to the server
const client = net.createConnection(7778, 'localhost', () => {
  console.log(`Connected to server and send ${isopackAsString}`);
  // Send the message to the server
  client.write(isopackAsString);
});

client.on('data', (data) => {
  console.log(`Received message: ${data}`);
});
console.log('buffer from data', isopack.getBufferMessage());