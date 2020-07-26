import api from "./api";

export const login = (email, password) => api.post("", {
    query : `query login($email : String!, $password : String!){
        login(email : $email, password : $password){
            status
            token
            userId
            error
        }
    }`,
    variables : {email, password}
})


export const register = (email, password, username) => api.post("", {
    query : `mutation register($email : String!, $password : String!, $username : String!){
        register (email : $email, password : $password, username : $username){
            message
            status
            error
        }
    }`,
    variables : { email, password, username }
})