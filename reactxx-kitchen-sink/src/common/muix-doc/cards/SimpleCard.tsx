import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Card from 'reactxx-muix/current/Card/Card';
import CardActions from 'reactxx-muix/current/CardActions/CardActions';
import CardContent from 'reactxx-muix/current/CardContent/CardContent';
import Button from 'reactxx-muix/current/Button/Button';
import Typography from 'reactxx-muix/current/Typography/Typography';
const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  const {
    classes
  } = props;
  const bull = <span className={classNamesStr(classes.bullet)}>•</span>;
  return <div>
      <Card className={classNames(classes.card)}>
        <CardContent>
          <Typography className={classNames(classes.title)} color="textSecondary">
            Word of the Day
          </Typography>
          <Typography variant="headline" component="h2">
            be
            {bull}
            nev
            {bull}o{bull}
            lent
          </Typography>
          <Typography className={classNames(classes.pos)} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>;
}

SimpleCard['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), SimpleCard)();