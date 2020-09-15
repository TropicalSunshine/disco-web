import { DjControls } from "shared/utils/socket";

function useCenterPanelListeners(setters, currentUserId) {

    const {
        setDjs,
        setIsStepUp
    } = setters;

    const bind = () => {
        DjControls.addStepUpListener(({ userId }) => {
            setDjs(prevDjs => {
                prevDjs.push(userId);
                return prevDjs;
            });
        });

        DjControls.addStepDownListener(({ userId }) => {
            console.log("recieving step down");
            if (userId === currentUserId) setIsStepUp(false);
            setDjs(prevDjs => {
                return prevDjs.filter(id => id !== userId);
            });
        });
    }

    const unbind = () => {
        DjControls.removeStepUpListener();
        DjControls.removeStepDownListener();
    };

    const emitStepUp = () => {
        DjControls.emitStepUp();
    }

    const emitStepDown = () => {
        DjControls.emitStepDown();
    }


    return {
        bind,
        unbind,
        emitStepDown,
        emitStepUp
    }
}

export default useCenterPanelListeners;
