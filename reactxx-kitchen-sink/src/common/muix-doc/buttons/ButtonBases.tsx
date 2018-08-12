import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import ButtonBase from 'reactxx-muix/current/ButtonBase/ButtonBase';
import Typography from 'reactxx-muix/current/Typography/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      // Overrides inline-style
      height: 100
    },
    "&:hover": {
      zIndex: 1,
      '& .imageBackdrop1': {
        opacity: 0.15
      },
      '& .imageMarked1': {
        opacity: 0
      },
      '& .imageTitle1': {
        border: '4px solid currentColor'
      }
    },
    "&.focusVisible1": {
      zIndex: 1,
      '& .imageBackdrop1': {
        opacity: 0.15
      },
      '& .imageMarked1': {
        opacity: 0
      },
      '& .imageTitle1': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {
    NAME$focusVisible1: true
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
    NAME$imageBackdrop1: true
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    NAME$imageTitle1: true
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
    NAME$imageMarked1: true
  }
});

const images = [{
  url: 'src/ks/common/muix/static/images/grid-list/breakfast.jpg',
  title: 'Breakfast',
  width: '40%'
}, {
  url: 'src/ks/common/muix/static/images/grid-list/burgers.jpg',
  title: 'Burgers',
  width: '30%'
}, {
  url: 'src/ks/common/muix/static/images/grid-list/camera.jpg',
  title: 'Camera',
  width: '30%'
}];

function ButtonBases(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      {images.map(image => <ButtonBase focusRipple key={image.title} className={classNames(classes.image)} focusVisibleClassName={classes.focusVisible} style={{
      width: image.width
    }}>
          <span className={classNamesStr(classes.imageSrc)} style={{
        backgroundImage: `url(${image.url})`
      }} />
          <span className={classNamesStr(classes.imageBackdrop)} />
          <span className={classNamesStr(classes.imageButton)}>
            <Typography component="span" variant="subheading" color="inherit" className={classNames(classes.imageTitle)}>
              {image.title}
              <span className={classNamesStr(classes.imageMarked)} />
            </Typography>
          </span>
        </ButtonBase>)}
    </div>;
}

ButtonBases['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ButtonBases)();