import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'

import Card from 'reactxx-mui-web/Card/Card';
import CardActions from 'reactxx-mui-web/CardActions/CardActions';
import CardContent from 'reactxx-mui-web/CardContent/CardContent';
import CardHeader from 'reactxx-mui-web/CardHeader/CardHeader';
import Button from 'reactxx-muix/web/Button/Button';
import IconButton from 'reactxx-mui-web/IconButton/IconButton';
import Typography from 'reactxx-mui-web/Typography/Typography';
import CardMedia from 'reactxx-mui-web/CardMedia/CardMedia';
import Collapse from 'reactxx-mui-web/Collapse/Collapse';
import Avatar from 'reactxx-mui-web/Avatar/Avatar';

import red from 'reactxx-mui-web/colors/red';

import { Icon } from 'reactxx-primitives'
import { Heart } from 'reactxx-mdi/Heart'
import { Play } from 'reactxx-mdi/Play'
import { SkipNext } from 'reactxx-mdi/SkipNext'
import { SkipPrevious } from 'reactxx-mdi/SkipPrevious'
import { DotsVertical } from 'reactxx-mdi/DotsVertical'
import { ShareVariant } from 'reactxx-mdi/ShareVariant'
import { ChevronDown } from 'reactxx-mdi/ChevronDown'

const styles = {
  root: {
    padding: 30,
    overflow:'auto',
  } as React.CSSProperties,
  card: {
    minWidth: 275,
    maxWidth: 345,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function simpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Word of the Day
          </Typography>
          <Typography variant="headline" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
const SimpleCard = withStylesCreator(styles as any, simpleCard)()

function simpleMediaCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="src/ks/common/muix/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
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
    </div>
  );
}
const SimpleMediaCard = withStylesCreator(styles as any, simpleMediaCard)()

const stylesUIControls = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function mediaControlCard(props) {
  const { classes, $system: {theme} } = props;

  return (
    <div>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">Live From Space</Typography>
            <Typography variant="subheading" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Previous">
              {theme.direction === 'rtl' ? <Icon data={SkipNext} /> : <Icon data={SkipPrevious} />}
            </IconButton>
            <IconButton aria-label="Play/pause">
              <Icon data={Play} />
            </IconButton>
            <IconButton aria-label="Next">
              {theme.direction === 'rtl' ? <Icon data={SkipPrevious} /> : <Icon data={SkipNext} />}
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
    </div>
  );
}
const MediaControlCard = withStylesCreator(stylesUIControls as any, mediaControlCard)()

const stylesComplex = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class recipeReviewCard extends React.Component<any, any> {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, $system: { classNames } } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton>
                <Icon data={DotsVertical} />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image="src/ks/common/muix/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with
              your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <Icon data={Heart} />
            </IconButton>
            <IconButton aria-label="Share">
              <Icon data={ShareVariant} />
            </IconButton>
            <IconButton
              className={classNames(classes.expand, this.state.expanded && classes.expandOpen)}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <Icon data={ChevronDown} />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Method:
              </Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                the rice, and cook again without stirring, until mussels have opened and rice is
                just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

const RecipeReviewCard = withStylesCreator(stylesComplex as any, recipeReviewCard)()

class App extends React.Component<any> {
  render() {
    const { classes, $system: { classNamesStr } } = this.props;
    return <div className={classNamesStr(classes.root)}>
      <h2>Simple Card</h2>
      <SimpleCard />
      <h2>Media</h2>
      <SimpleMediaCard />
      <h2>UI Controls</h2>
      <MediaControlCard />
      <h2>Complex Interaction</h2>
      <RecipeReviewCard />
    </div>
  }
}



export default withStylesCreator(styles as any, App)()