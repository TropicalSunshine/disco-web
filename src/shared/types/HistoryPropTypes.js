import PropTypes from 'prop-types';

const HistoryPropTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default HistoryPropTypes;
