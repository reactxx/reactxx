import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import GridList from 'reactxx-muix/current/GridList/GridList';
import GridListTile from 'reactxx-muix/current/GridListTile/GridListTile';
import GridListTileBar from 'reactxx-muix/current/GridListTileBar/GridListTileBar';
import ListSubheader from 'reactxx-muix/current/ListSubheader/ListSubheader';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import InfoIcon from 'reactxx-icons/Info';
import tileData from './tileData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
});
/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */


function TitlebarGridList(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{
        height: 'auto'
      }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map(tile => <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar title={tile.title} subtitle={<span>by: {tile.author}</span>} actionIcon={<IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>} />
          </GridListTile>)}
      </GridList>
    </div>;
}

TitlebarGridList['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), TitlebarGridList)();