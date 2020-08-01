import PropTypes from "prop-types";

const AuthPropTypes = {
    auth : PropTypes.shape({
        userId: PropTypes.string,
        token: PropTypes.string,
        isLoggedIn : PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        register : PropTypes.func.isRequired
    })
}


export default AuthPropTypes;