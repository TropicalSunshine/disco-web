const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
export const socketUrl = `${socketProtocol}://disco-socket-server.herokuapp.com/`;