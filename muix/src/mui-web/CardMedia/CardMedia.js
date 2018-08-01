import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },

  /* Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
  media: {
    width: '100%'
  }
};
const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];

function CardMedia(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
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
  return <Component className={classNamesStr(classes.root, isMediaComponent && classes.media, className)} style={composedStyle} src={isMediaComponent ? image || src : undefined} {...other} />;
}

const defaultProps = CardMedia.defaultProps = {
  component: 'div'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/CardMedia/CardMedia').Shape>}
*/
export const CardMediaCreator = withStyles(styles, CardMedia, {
  isMui: true,
  defaultProps
});
const CardMediaComponent = CardMediaCreator();
if (CardMedia.muiName) CardMediaComponent.muiName = CardMedia.muiName;
export default CardMediaComponent;