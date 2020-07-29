import PropTypes from "prop-types";

const AuthPropTypes = {
    userId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    token: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}


export default AuthPropTypes;