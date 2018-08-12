import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Input from 'reactxx-muix/current/Input/Input';
import InputLabel from 'reactxx-muix/current/InputLabel/InputLabel';
import MenuItem from 'reactxx-muix/current/MenuItem/MenuItem';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import Select from 'reactxx-muix/current/Select/Select';
import Checkbox from 'reactxx-muix/current/Checkbox/Checkbox';
import Chip from 'reactxx-muix/current/Chip/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const names = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander', 'Carlos Abbott', 'Miriam Wagner', 'Bradley Wilkerson', 'Virginia Andrews', 'Kelly Snyder'];

class MultipleSelect extends React.Component<any, any> {
  state: any = {
    name: []
  };
  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  render() {
    const {
      classes,
      theme
    } = this.props;
    return <div className={classNamesStr(classes.root)}>
        <FormControl className={classNames(classes.formControl)}>
          <InputLabel htmlFor="select-multiple">Name</InputLabel>
          <Select multiple value={this.state.name} onChange={this.handleChange} input={<Input id="select-multiple" />} MenuProps={MenuProps}>
            {names.map(name => <MenuItem key={name} value={name} style={({
            fontWeight: this.state.name.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
          } as any)}>
                {name}
              </MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classNames(classes.formControl)}>
          <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
          <Select multiple value={this.state.name} onChange={this.handleChange} input={<Input id="select-multiple-checkbox" />} renderValue={(selected: any) => selected.join(', ')} MenuProps={MenuProps}>
            {names.map(name => <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classNames(classes.formControl)}>
          <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
          <Select multiple value={this.state.name} onChange={this.handleChange} input={<Input id="select-multiple-chip" />} renderValue={(selected: any) => <div className={classNamesStr(classes.chips)}>
                {selected.map(value => <Chip key={value} label={value} className={classNames(classes.chip)} />)}
              </div>} MenuProps={MenuProps}>
            {names.map(name => <MenuItem key={name} value={name} style={({
            fontWeight: this.state.name.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
          } as any)}>
                {name}
              </MenuItem>)}
          </Select>
        </FormControl>
      </div>;
  }

}

MultipleSelect['propTypes'] = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), MultipleSelect, {
  withTheme: true
})();