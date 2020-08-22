const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
export const socketUrl = `${socketProtocol}://disco-socket-server.herokuapp.com/`;
//`${socketProtocol}://localhost:5001/`;

export const baseApiUrl = "https://disco-gateway.herokuapp.com";
export const graphqlEndpoint = "/api/v1/graphql";
export const apiUrl = `${baseApiUrl}${graphqlEndpoint}`;