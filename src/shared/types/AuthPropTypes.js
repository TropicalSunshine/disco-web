import PropTypes from "prop-types";

const AuthPropTypes = {
    auth : PropTypes.shape({
        userId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]).isRequired,
        token: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]).isRequired,
        isLoggedIn : PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        register : PropTypes.func.isRequired
    })
}


export default AuthPropTypes;