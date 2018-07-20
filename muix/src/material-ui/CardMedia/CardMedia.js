import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import withStyles from '../styles/withStyles';
export const styles = {
  root: {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  media: {
    width: '100%'
  }
};
const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

function CardMedia(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    className,
    component: Component,
    image,
    src,
    style,
    ...other
  } = props;
  warning(Boolean(image || src), 'Material-UI: either `image` or `src` property must be specified.');
  const isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
  const composedStyle = !isMediaComponent && image ? {
    backgroundImage: `url("${image}")`,
    ...style
  } : style;
  return <Component className={classNames(classes.root, isMediaComponent && classes.media, className)} style={composedStyle} src={isMediaComponent ? image || src : undefined} {...other} />;
}

export default withStyles(styles, {
  name: 'MuiCardMedia',
  defaultProps: {
    component: 'div'
  }
})(CardMedia);