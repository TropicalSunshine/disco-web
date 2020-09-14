import { DjControls } from "shared/utils/socket";


function useAttachCenterPanelListeners(setDjs) {
    
    const bind = () => {
        DjControls.addStepUpListener(({ userId }) => {
            setDjs( prevDjs => {
                prevDjs.push(userId);
                return prevDjs;
            });
        });

        DjControls.addStepDownListener( ({ userId }) => {
            setDjs(prevDjs => {
                return prevDjs.filter( id => id !== userId);
            });
        });
    }

    const unbind = () => {
        DjControls.removeStepUpListener();
        DjControls.removeStepDownListener();
    }


    return {
        bind,
        unbind
    }
}
