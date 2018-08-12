import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import GridList from 'reactxx-muix/current/GridList/GridList';
import GridListTile from 'reactxx-muix/current/GridListTile/GridListTile';
import GridListTileBar from 'reactxx-muix/current/GridListTileBar/GridListTileBar';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import StarBorderIcon from 'reactxx-icons/StarBorder';
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
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
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
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */


function AdvancedGridList(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <GridList cellHeight={200} spacing={1} className={classNames(classes.gridList)}>
        {tileData.map(tile => <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar title={tile.title} titlePosition="top" actionIcon={<IconButton className={classNames(classes.icon)}>
                  <StarBorderIcon />
                </IconButton>} actionPosition="left" className={classNames(classes.titleBar)} />
          </GridListTile>)}
      </GridList>
    </div>;
}

AdvancedGridList['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), AdvancedGridList)();