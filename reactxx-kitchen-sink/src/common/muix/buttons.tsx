import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import Button from 'reactxx-mui-web/Button/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function TextButtons(props) {
  const { classes, $system: {classNamesStr } } = props;
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
      {/* <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
        <AddIcon />
      </Button> */}
    </div>

  );
}

//const App: React.SFC = props => <Button variant='raised' disabled size='large' color='secondary' >CLICK ME</Button>
export default withStylesCreator(styles as any, TextButtons, {isMui:true})()
//export default App

