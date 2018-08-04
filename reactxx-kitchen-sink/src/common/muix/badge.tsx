import React from 'react'
import withStylesCreator, { toAtomic } from 'reactxx-mui-web/styles/withStyles'
import Badge from 'reactxx-mui-web/Badge/Badge';
import AppBar from 'reactxx-mui-web/AppBar/AppBar';
import Tabs from 'reactxx-mui-web/Tabs/Tabs';
import Tab from 'reactxx-mui-web/Tab/Tab';
import Typography from 'reactxx-mui-web/Typography/Typography';
import Button from 'reactxx-muix/web/Button/Button';
import IconButton from 'reactxx-mui-web/IconButton/IconButton';
import { Icon } from 'reactxx-primitives'
import { Email } from 'reactxx-mdi/Email'
import { Cart } from 'reactxx-mdi/Cart'


const styles = theme => ({
  margin: {
    ...toAtomic('margin', theme.spacing.unit * 2)
  },
  padding: {
    ...toAtomic('padding', `0 ${theme.spacing.unit * 2}px`),
  },
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
});

function customizedBadge(props) {
  const { classes } = props;

  return (
    <IconButton aria-label="Cart">
      <Badge badgeContent={4} color="primary" classes={{ badge: classes.badge }}>
        <Icon data={Cart} />
      </Badge>
    </IconButton>
  );
}
const CustomizedBadge = withStylesCreator(styles as any, customizedBadge)()

function simpleBadge(props) {
  const { classes } = props;
  return (
    <div>
      <div>
        <Badge className={classes.margin} badgeContent={4} color="primary">
          <Icon data={Email} />
        </Badge>
        <Badge className={classes.margin} badgeContent={10} color="secondary">
          <Icon data={Email} />
        </Badge>
        <IconButton aria-label="4 pending messages" className={classes.margin}>
          <Badge badgeContent={4} color="primary">
            <Icon data={Email} />
          </Badge>
        </IconButton>
      </div>
      <AppBar position="static" className={classes.margin}>
        <Tabs value={0}>
          <Tab
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={4}>
                Item One
              </Badge>
            }
          />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      <Badge color="primary" badgeContent={4} className={classes.margin}>
        <Typography className={classes.padding}>Typography</Typography>
      </Badge>
      <Badge color="primary" badgeContent={4} className={classes.margin}>
        <Button variant="contained">Button</Button>
      </Badge>
    </div>
  );
}
const SimpleBadge = withStylesCreator(styles as any, simpleBadge)()

class App extends React.Component<any> {
  render() {
    const { classes, $system: { classNamesStr } } = this.props;
    return <div className={classNamesStr(classes.root)}>
      <h2>Simple Badges</h2>
      <SimpleBadge />
      <h2>Customized Badge</h2>
      <CustomizedBadge />
    </div>
  }
}

export default withStylesCreator(styles as any, App)()