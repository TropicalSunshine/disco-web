import { Component } from 'react'
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
    constructor(props) {
        super();
        this.state = {
            hasError: false,
            errorMsg: ""
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            errorMsg: error.message
        };
    }

    componentDidCatch(error, errorInfo) {

        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback(this.state.errorMsg);
        }

        return this.props.children;
    }

}

ErrorBoundary.propTypes = {
    fallback: PropTypes.func.isRequired
}

export default ErrorBoundary;