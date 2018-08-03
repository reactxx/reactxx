import React from 'react'
import withStylesCreator, { toAtomic } from 'reactxx-mui-web/styles/withStyles'
import Avatar from 'reactxx-mui-web/Avatar/Avatar';
import Chip from 'reactxx-mui-web/Chip/Chip';
import Paper from 'reactxx-mui-web/Paper/Paper';
import { Icon } from 'reactxx-primitives'
import { Face } from 'reactxx-mdi/Face'
import { Check } from 'reactxx-mdi/Check'
import { Emoticon } from 'reactxx-mdi/Emoticon'


const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...toAtomic('padding', 30),
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    ...toAtomic('padding', theme.spacing.unit / 2),
  },
  chip: {
    ...toAtomic('margin', theme.spacing.unit),
  },
});

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function chips(props) {
  const { classes, $system: { classNamesStr } } = props;
  return (
    <div className={classNamesStr(classes.root)}>
      <Chip label="Basic Chip" className={classes.chip} />
      <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Clickable Chip"
        onClick={handleClick}
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar src="src/ks/common/muix/static/images/uxceo-128.jpg" />}
        label="Deletable Chip"
        onDelete={handleDelete}
        className={classes.chip}
      />
      <Chip
        avatar={
          <Avatar>
            <Icon data={Face} />
          </Avatar>
        }
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
      />
      <Chip
        label="Custom delete icon Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        deleteIcon={<Icon data={Check} />}
      />
      <Chip
        label="Clickable Link Chip"
        className={classes.chip}
        component="a"
        //href="#chip"
        clickable
      />
    </div>
  );
}

const Chips = withStylesCreator(styles as any, chips)()

class chipsArray extends React.Component<any, any> {
  state = {
    chipData: [
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ],
  };

  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }

    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes, $system: { classNamesStr } } = this.props;

    return (
      <Paper className={classes.root}>
        {this.state.chipData.map(data => {
          let avatar = null;

          if (data.label === 'React') {
            avatar = (
              <Avatar>
                <Icon data={Emoticon} className={classes.svgIcon} />
              </Avatar>
            );
          }

          return (
            <Chip
              key={data.key}
              avatar={avatar}
              label={data.label}
              onDelete={this.handleDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </Paper>
    );
  }
}

const ChipsArray = withStylesCreator(styles as any, chipsArray)()

class App extends React.Component<any> {
  render() {
    const { classes, $system: { classNamesStr } } = this.props;
    return <div className={classNamesStr(classes.container)}>
      <h2>Chip array</h2>
      <Chips />
      <h2>Chip</h2>
      <ChipsArray />
    </div>
  }
}

export default withStylesCreator(styles as any, App)()