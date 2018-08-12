import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import Button from 'reactxx-muix/current/Button/Button';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Dialog from 'reactxx-muix/current/Dialog/Dialog';
import DialogActions from 'reactxx-muix/current/DialogActions/DialogActions';
import DialogContent from 'reactxx-muix/current/DialogContent/DialogContent';
import DialogTitle from 'reactxx-muix/current/DialogTitle/DialogTitle';
import InputLabel from 'reactxx-muix/current/InputLabel/InputLabel';
import Input from 'reactxx-muix/current/Input/Input';
import MenuItem from 'reactxx-muix/current/MenuItem/MenuItem';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import Select from 'reactxx-muix/current/Select/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class DialogSelect extends React.Component<any, any> {
  state: any = {
    open: false,
    age: ''
  };
  handleChange = name => event => {
    this.setState({
      [name]: Number(event.target.value)
    });
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      classes
    } = this.props;
    return <div>
        <Button onClick={this.handleClickOpen}>Open select dialog</Button>
        <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <form className={classNamesStr(classes.container)}>
              <FormControl className={classNames(classes.formControl)}>
                <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                <Select native value={this.state.age} onChange={this.handleChange('age')} input={<Input id="age-native-simple" />}>
                  <option value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
              <FormControl className={classNames(classes.formControl)}>
                <InputLabel htmlFor="age-simple">Age</InputLabel>
                <Select value={this.state.age} onChange={this.handleChange('age')} input={<Input id="age-simple" />}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>;
  }

}

DialogSelect['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), DialogSelect)();