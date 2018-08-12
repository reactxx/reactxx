import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Card from 'reactxx-muix/current/Card/Card';
import CardActions from 'reactxx-muix/current/CardActions/CardActions';
import CardContent from 'reactxx-muix/current/CardContent/CardContent';
import CardMedia from 'reactxx-muix/current/CardMedia/CardMedia';
import Button from 'reactxx-muix/current/Button/Button';
import Typography from 'reactxx-muix/current/Typography/Typography';
const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9

  }
};

function SimpleMediaCard(props) {
  const {
    classes
  } = props;
  return <div>
      <Card className={classNames(classes.card)}>
        <CardMedia className={classNames(classes.media)} image="src/ks/common/muix/static/images/cards/contemplative-reptile.jpg" title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>;
}

SimpleMediaCard['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), SimpleMediaCard)();