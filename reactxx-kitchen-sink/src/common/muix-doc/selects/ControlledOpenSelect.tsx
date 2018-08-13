import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import InputLabel from 'reactxx-muix/current/InputLabel/InputLabel';
import MenuItem from 'reactxx-muix/current/MenuItem/MenuItem';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import Select from 'reactxx-muix/current/Select/Select';
import Button from 'reactxx-muix/current/Button/Button';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class ControlledOpenSelect extends React.Component<any, any> {
  state: any = {
    age: '',
    open: false
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const {
      classes
    } = this.props;
    return <form autoComplete="off">
        <Button className={classNames(classes.button)} onClick={this.handleOpen}>
          Open the select
        </Button>
        <FormControl className={classNames(classes.formControl)}>
          <InputLabel htmlFor="demo-controlled-open-select">Age</InputLabel>
          <Select open={this.state.open} onClose={this.handleClose} onOpen={this.handleOpen} value={this.state.age} onChange={this.handleChange} inputProps={{
          name: 'age',
          id: 'demo-controlled-open-select'
        }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </form>;
  }

}

ControlledOpenSelect['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ControlledOpenSelect)();