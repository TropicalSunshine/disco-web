const socketProtocol    = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
export const socketUrl  = `${socketProtocol}://${process.env.REACT_APP_SOCKET_URL}`;

export const baseApiUrl         = process.env.REACT_APP_API_URL;
export const graphqlEndpoint    = process.env.REACT_APP_API_ENDPOINT;
export const apiUrl             = `${baseApiUrl}${graphqlEndpoint}`;