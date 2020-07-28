import LoaderPage from "./loaders/LoaderPage/LoaderPage.jsx"; 
import Spinner from "./loaders/Spinner";

import WrappedInput from "./form/Input";
import InputSubmit from "./form/InputSubmit";

const Components = {};

export {
    InputSubmit,
    WrappedInput,
    LoaderPage,
    Spinner
}

Components.InputSubmit = InputSubmit;
Components.LoaderPage = LoaderPage;
Components.Spinner = Spinner;

export default Components;



