import React from 'react'
import { ThemeProvider } from 'reactxx-basic'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import Button from 'reactxx-muix/web/Button/Button';
import IconButton from 'reactxx-mui-web/IconButton/IconButton'
import { Plus } from 'reactxx-mdi/Plus'
import { Pencil } from 'reactxx-mdi/Pencil'
import { Navigation } from 'reactxx-mdi/Navigation'
import { Delete } from 'reactxx-mdi/Delete'
import { Alarm } from 'reactxx-mdi/Alarm'
import { CartPlus } from 'reactxx-mdi/CartPlus'
import { Camera } from 'reactxx-mdi/Camera'
import { Send } from 'reactxx-mdi/Send'
import { Upload } from 'reactxx-mdi/Upload'
import { Microphone } from 'reactxx-mdi/Microphone'
import { ContentSave } from 'reactxx-mdi/ContentSave'
import { Icon } from 'reactxx-primitives'

import purple from 'reactxx-mui-web/colors/purple';
import green from 'reactxx-mui-web/colors/green';
import createMuiTheme from 'reactxx-mui-web/styles/createMuiTheme';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  // Customized Buttons
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
})

function TextButtons(props) {
  const { classes, $system: { classNamesStr, classNames } } = props;
  return (
    <div style={{ padding: 10 }}>
      <h2>Text Buttons</h2>
      <div>
        <Button className={classes.button}>Default</Button>
        <Button color="primary" className={classes.button}>
          Primary
      </Button>
        <Button color="secondary" className={classes.button}>
          Secondary
      </Button>
        <Button disabled className={classes.button}>
          Disabled
      </Button>
        <Button href="#text-buttons" className={classes.button}>
          Link
      </Button>
        <input
          accept="image/*"
          className={classNamesStr(classes.input)}
          id="flat-button-file"
          multiple
          type="file"
        />
        <label htmlFor="flat-button-file">
          <Button component="span" className={classes.button}>
            Upload
        </Button>
        </label>
      </div>
      <div>
        <h2>Outlined Buttons</h2>
        <Button variant="outlined" className={classes.button}>
          Default
      </Button>
        <Button variant="outlined" color="primary" className={classes.button}>
          Primary
      </Button>
        <Button variant="outlined" color="secondary" className={classes.button}>
          Secondary
      </Button>
        <Button variant="outlined" disabled className={classes.button}>
          Disabled
      </Button>
        <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
          Link
      </Button>
        <input
          accept="image/*"
          className={classNamesStr(classes.input)}
          id="outlined-button-file"
          multiple
          type="file"
        />
        <label htmlFor="outlined-button-file">
          <Button variant="outlined" component="span" className={classes.button}>
            Upload
        </Button>
        </label>
      </div>
      <div>
        <h2>Contained  Buttons</h2>
        <Button variant="contained" className={classes.button}>
          Default
      </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Primary
      </Button>
        <Button variant="contained" color="secondary" className={classes.button}>
          Secondary
      </Button>
        <Button variant="contained" color="secondary" disabled className={classes.button}>
          Disabled
      </Button>
        <Button variant="contained" href="#contained-buttons" className={classes.button}>
          Link
      </Button>
        <input
          accept="image/*"
          className={classNamesStr(classes.input)}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span" className={classes.button}>
            Upload
        </Button>
        </label>
      </div>
      <div>
        <h2>Floating Action Buttons</h2>
        <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
          <Icon data={Plus} />
        </Button>
        <Button variant="fab" color="secondary" aria-label="Edit" className={classes.button}>
          <Icon data={Pencil} />
        </Button>
        <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
          <Icon data={Navigation} />
          Extended
      </Button>
        <Button variant="fab" disabled aria-label="Delete" className={classes.button}>
          <Icon data={Delete} />
        </Button>
      </div>
      <div>
        <h2>Sizes</h2>
        <div>
          <Button size="small" className={classes.button}>
            Small
        </Button>
          <Button size="medium" className={classes.button}>
            Medium
        </Button>
          <Button size="large" className={classes.button}>
            Large
        </Button>
        </div>
        <div>
          <Button variant="outlined" size="small" color="primary" className={classes.button}>
            Small
        </Button>
          <Button variant="outlined" size="medium" color="primary" className={classes.button}>
            Medium
        </Button>
          <Button variant="outlined" size="large" color="primary" className={classes.button}>
            Large
        </Button>
        </div>
        <div>
          <Button variant="contained" size="small" color="primary" className={classes.button}>
            Small
        </Button>
          <Button variant="contained" size="medium" color="primary" className={classes.button}>
            Medium
        </Button>
          <Button variant="contained" size="large" color="primary" className={classes.button}>
            Large
        </Button>
        </div>
        <div>
          <Button variant="fab" mini color="secondary" aria-label="Add" className={classes.button}>
            <Icon data={Plus} />
          </Button>
          <Button variant="fab" color="secondary" aria-label="Add" className={classes.button}>
            <Icon data={Plus} />
          </Button>
        </div>
      </div>
      <h2>Icon Buttons</h2>
      <div>
        <IconButton className={classes.button} aria-label="Delete">
          <Icon data={Delete} />
        </IconButton>
        <IconButton className={classes.button} aria-label="Delete" disabled color="primary">
          <Icon data={Delete} />
        </IconButton>
        <IconButton color="secondary" className={classes.button} aria-label="Add an alarm">
          <Icon data={Alarm} />
        </IconButton>
        <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart">
          <Icon data={CartPlus} />
        </IconButton>
        <input accept="image/*" className={classNamesStr(classes.input)} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" className={classes.button} component="span">
            <Icon data={Camera} />
          </IconButton>
        </label>
      </div>
      <h2>Buttons with icons and label</h2>
      <div>
        <Button variant="contained" color="secondary" className={classes.button}>
          Delete
         <Icon data={Delete} className={classes.rightIcon} />
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Send
        <Icon data={Send} className={classes.rightIcon} />
        </Button>
        <Button variant="contained" color="default" className={classes.button}>
          Upload
        <Icon data={Upload} className={classes.rightIcon} />
        </Button>
        <Button variant="contained" disabled color="secondary" className={classes.button}>
          <Icon data={Microphone} className={classes.leftIcon} />
          Talk
        </Button>
        <Button variant="contained" size="small" className={classes.button}>
          <Icon data={ContentSave} className={classNames(classes.leftIcon, classes.iconSmall)} />
          Save
        </Button>
      </div>
      <h2>Customized Buttons</h2>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          className={classNames(classes.button, classes.cssRoot)}
        >
          Custom CSS
        </Button>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" className={classes.button}>
            ThemeProvider
          </Button>
        </ThemeProvider>
        <Button
          variant="contained"
          color="primary"
          disableRipple
          className={classNames(classes.button, classes.bootstrapRoot)}
        >
          Bootstrap
        </Button>
      </div>
    </div>

  );
}

function TextButtons2(props) {
  const { classes, $system: { classNamesStr, classNames } } = props;
  return <Button
    variant="contained"
    color="primary"
    className={classNames(classes.button, classes.cssRoot)}
  >
    Custom CSS
  </Button>
}

export default withStylesCreator(styles as any, TextButtons)()

