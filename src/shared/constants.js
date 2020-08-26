const socketProtocol    = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
export const socketUrl  = `${socketProtocol}://${process.env.REACT_APP_SOCKET_URL}`;

export const baseApiUrl         = "https://disco-gateway.herokuapp.com";
export const graphqlEndpoint    = "/api/v1/graphql";
export const apiUrl             = `${baseApiUrl}${graphqlEndpoint}`;