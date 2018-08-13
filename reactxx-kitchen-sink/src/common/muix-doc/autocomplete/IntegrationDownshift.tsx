import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import TextField from 'reactxx-muix/current/TextField/TextField';
import Popper from 'reactxx-muix/current/Popper/Popper';
import Paper from 'reactxx-muix/current/Paper/Paper';
import MenuItem from 'reactxx-muix/current/MenuItem/MenuItem';
import Chip from 'reactxx-muix/current/Chip/Chip';
const suggestions = [{
  label: 'Afghanistan'
}, {
  label: 'Aland Islands'
}, {
  label: 'Albania'
}, {
  label: 'Algeria'
}, {
  label: 'American Samoa'
}, {
  label: 'Andorra'
}, {
  label: 'Angola'
}, {
  label: 'Anguilla'
}, {
  label: 'Antarctica'
}, {
  label: 'Antigua and Barbuda'
}, {
  label: 'Argentina'
}, {
  label: 'Armenia'
}, {
  label: 'Aruba'
}, {
  label: 'Australia'
}, {
  label: 'Austria'
}, {
  label: 'Azerbaijan'
}, {
  label: 'Bahamas'
}, {
  label: 'Bahrain'
}, {
  label: 'Bangladesh'
}, {
  label: 'Barbados'
}, {
  label: 'Belarus'
}, {
  label: 'Belgium'
}, {
  label: 'Belize'
}, {
  label: 'Benin'
}, {
  label: 'Bermuda'
}, {
  label: 'Bhutan'
}, {
  label: 'Bolivia, Plurinational State of'
}, {
  label: 'Bonaire, Sint Eustatius and Saba'
}, {
  label: 'Bosnia and Herzegovina'
}, {
  label: 'Botswana'
}, {
  label: 'Bouvet Island'
}, {
  label: 'Brazil'
}, {
  label: 'British Indian Ocean Territory'
}, {
  label: 'Brunei Darussalam'
}];

function renderInput(inputProps) {
  const {
    InputProps,
    classes,
    ref,
    ...other
  } = inputProps;
  return <TextField InputProps={{
    inputRef: ref,
    classes: {
      root: classes.inputRoot
    },
    ...InputProps
  }} {...other} />;
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  return <MenuItem {...itemProps} key={suggestion.label} selected={isHighlighted} component="div" style={{
    fontWeight: isSelected ? 500 : 400
  }}>
      {suggestion.label}
    </MenuItem>;
}

renderSuggestion['propTypes'] = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({
    label: PropTypes.string
  }).isRequired
};

function getSuggestions(inputValue) {
  let count = 0;
  return suggestions.filter(suggestion => {
    const keep = (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class DownshiftMultiple extends React.Component<any, any> {
  state: any = {
    inputValue: '',
    selectedItem: []
  };
  handleKeyDown = event => {
    const {
      inputValue,
      selectedItem
    } = this.state;

    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
  };
  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };
  handleChange = item => {
    let {
      selectedItem
    } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: '',
      selectedItem
    });
  };
  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return {
        selectedItem
      };
    });
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      inputValue,
      selectedItem
    } = this.state;
    return <Downshift id="downshift-multiple" inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedItem}>
        {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex
      }) => <div className={classNamesStr(classes.container)}>
            {renderInput({
          fullWidth: true,
          classes,
          InputProps: getInputProps(({
            startAdornment: selectedItem.map(item => <Chip key={item} tabIndex={-1} label={item} className={classNames(classes.chip)} onDelete={this.handleDelete(item)} />),
            onChange: this.handleInputChange,
            onKeyDown: this.handleKeyDown,
            placeholder: 'Select multiple countries'
          } as any))
        })}
            {isOpen ? <Paper className={classNames(classes.paper)} square>
                {getSuggestions(inputValue2).map((suggestion, index) => renderSuggestion({
            suggestion,
            index,
            itemProps: getItemProps({
              item: suggestion.label
            }),
            highlightedIndex,
            selectedItem: selectedItem2
          }))}
              </Paper> : null}
          </div>}
      </Downshift>;
  }

}

DownshiftMultiple['propTypes'] = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: 'wrap'
  }
});

let popperNode;

function IntegrationDownshift(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <Downshift id="downshift-simple">
        {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex
      }) => <div className={classNamesStr(classes.container)}>
            {renderInput({
          fullWidth: true,
          classes,
          InputProps: getInputProps({
            placeholder: 'Search a country (start with a)'
          })
        })}
            {isOpen ? <Paper className={classNames(classes.paper)} square>
                {getSuggestions(inputValue).map((suggestion, index) => renderSuggestion({
            suggestion,
            index,
            itemProps: getItemProps({
              item: suggestion.label
            }),
            highlightedIndex,
            selectedItem
          }))}
              </Paper> : null}
          </div>}
      </Downshift>
      <DownshiftMultiple classes={classes} />
      <Downshift id="downshift-popper">
        {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex
      }) => <div className={classNamesStr(classes.container)}>
            {renderInput({
          fullWidth: true,
          classes,
          InputProps: getInputProps({
            placeholder: 'With Popper'
          }),
          ref: node => {
            popperNode = node;
          }
        })}
            <Popper open={isOpen} anchorEl={popperNode}>
              <Paper square style={{
            width: popperNode ? popperNode.clientWidth : null
          }}>
                {getSuggestions(inputValue).map((suggestion, index) => renderSuggestion({
              suggestion,
              index,
              itemProps: getItemProps({
                item: suggestion.label
              }),
              highlightedIndex,
              selectedItem
            }))}
              </Paper>
            </Popper>
          </div>}
      </Downshift>
    </div>;
}

IntegrationDownshift['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), IntegrationDownshift)();