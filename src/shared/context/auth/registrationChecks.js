const passwordNumberCheck = /^.*[0-9].*$/;
const passwordLowerCaseCheck = /^.*[a-z].*$/;
const passwordUpperCaseCheck = /^.*[A-Z].*$/;
const spaceCheck = /^.*[\s].*$/

const emailReg = /^.*@.*$/;
const usernameCheckInvalidChars = /^[@#:]+$/;

export const checkPassword = password => {
    
    if (password.length < 8) throw new Error("Password too short");
    if (spaceCheck.test(password)) throw new Error("Password cannot contain spaces");
    if (!passwordNumberCheck.test(password)) throw new Error("Password must contain a number");
    if (!passwordLowerCaseCheck.test(password)) throw new Error("Password must contain a lower case letter");
    if (!passwordUpperCaseCheck.test(password)) throw new Error("Password must contain a upper case letter");
}

export const checkEmail = email => {
    if (!emailReg.test(email)) throw new Error("Invalid email");
}

export const checkUsername = username => {
    if (spaceCheck.test(username)) throw new Error("Username cannot contain spaces");
    if (username.length < 2) throw new Error("Username to short");
    if (username.length > 32) throw new Error("Username too long");
    if (usernameCheckInvalidChars.test(username)) throw new Error("Username contains invalid characters @#:");
}