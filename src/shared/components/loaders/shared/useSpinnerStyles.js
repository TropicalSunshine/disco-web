import { makeStyles } from "@material-ui/core/styles";

const useSpinnerStyles = makeStyles(() => ({
    bottom: {
        color: "var(--white)",
      },
      top: {
        color: 'var(--blue)',
        animationDuration: '750ms',
        position: 'absolute',
        left : 0
      },
      circle: {
        strokeLinecap: 'round',
        strokeDasharray: "30 200"
      }
}));

export default useSpinnerStyles;