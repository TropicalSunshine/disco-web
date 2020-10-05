import { DjControls } from "shared/utils/socket";

function useCenterPanelListeners(setters, currentUserId) {

    const {
        setDjs
    } = setters;

    const bind = () => {
        DjControls.addStepUpListener(({ userId }) => {
            console.log(`[socket event] : step up ${userId}`)
            setDjs(prevDjs => {
                return [...prevDjs, userId];
            });
        });

        DjControls.addStepDownListener(({ userId }) => {
            console.log(`[socket event] : step down ${userId}`);

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
