import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Card from 'reactxx-muix/current/Card/Card';
import CardContent from 'reactxx-muix/current/CardContent/CardContent';
import CardMedia from 'reactxx-muix/current/CardMedia/CardMedia';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import Typography from 'reactxx-muix/current/Typography/Typography';
import SkipPreviousIcon from 'reactxx-icons/SkipPrevious';
import PlayArrowIcon from 'reactxx-icons/PlayArrow';
import SkipNextIcon from 'reactxx-icons/SkipNext';

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

function MediaControlCard(props) {
  const {
    classes,
    theme
  } = props;
  return <div>
      <Card className={classNames(classes.card)}>
        <div className={classNamesStr(classes.details)}>
          <CardContent className={classNames(classes.content)}>
            <Typography variant="headline">Live From Space</Typography>
            <Typography variant="subheading" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div className={classNamesStr(classes.controls)}>
            <IconButton aria-label="Previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classNames(classes.playIcon)} />
            </IconButton>
            <IconButton aria-label="Next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </div>
        </div>
        <CardMedia className={classNames(classes.cover)} image="src/ks/common/muix/static/images/cards/live-from-space.jpg" title="Live from space album cover" />
      </Card>
    </div>;
}

MediaControlCard['propTypes'] = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), MediaControlCard, {
  withTheme: true
})();