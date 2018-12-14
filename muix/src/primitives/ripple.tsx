import React from "react";
import ReactDOM from "react-dom";
import posed from "react-pose";

const sheet = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // width: 200px;
    // height: 60px;
    // background-color: red;
    // color: white;
    // border-radius: 10px;
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none'
  },
  ripple: {
    display: 'block',
    position: 'absolute',
    //background: black;
    borderRadius: '100%',
    top: 0,
    left: 0,
  }
}

const Box = posed.div({
  closed: {
    opacity: 0,
    scale: 0,
    transition: {
      scale: {
        type: "keyframes",
        duration: 250,
        times: [0, 0.99, 1],
        values: [1, 1, 0]
      },
      opacity: {
        duration: 250
      }
    }
  },
  opened: {
    opacity: 0.2,
    scale: 1,
    transition: {
      duration: 250
    }
  }
});

const Example = props => {
  const [active, setActive] = React.useState(false);
  const rootEl = React.useRef(null);
  const boxEl = React.useRef(null);
  const activating = (ev: React.MouseEvent) => {

  }
  React.useEffect(() => {
    const { clientHeight: h, clientWidth: w } = rootEl.current;
    const radius = Math.sqrt(h * h + w * w);
    const style = boxEl.current.style;
    style.width = style.height = radius + "px";
    style.top = (h - radius) / 2 + "px";
    style.left = (w - radius) / 2 + "px";
  });
  return (
    <div
      className="button"
      ref={rootEl}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      HALLO RIPPLE
      <Box
        innerRef={el => (boxEl.current = el)}
        className="ripple"
        pose={active ? "opened" : "closed"}
      />
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById("root"));
