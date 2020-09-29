import api from "./api";

export const login = (email, password) => api.post("", {
    query: `query login($email : String!, $password : String!){
        login(email : $email, password : $password){
            status
            token
            userId
            error
        }
    }`,
    variables: { email, password }
});

export const logout = (token) => api.post("", {
    query: `
    query logout ( $token : String! ) {
        logout ( token : $token ) {
            status
            error
            message
        }
    }
    `,
    variables: { token }
});


export const register = (email, password, username) => api.post("", {
    query: `mutation register($email : String!, $password : String!, $username : String!){
        register (email : $email, password : $password, username : $username){
            message
            status
            error
        }
    }`,
    variables: { email, password, username }
});

export const getUserInfo = (userId) => api.post("", {
    query: `
        query getUserInfo( $userId : String! ) {
            getUserInfo( userId : $userId ){
                _id
                username
            }
        }
    `,
    variables: { userId }
});

export const getUserByUsername = username => api.post("", {
    query: `
        query getUserByUsername ( $username : String! ) {
            getUserByUsername( username : $username ){
                _id
                username
            }
        }
    `,
    variables: { username }
})

export const me = () => api.post("", {
    query: `
    query {
        me {
            _id
            username
        }
    }
    `
});