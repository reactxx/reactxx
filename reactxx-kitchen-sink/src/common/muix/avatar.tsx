import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import Avatar from 'reactxx-mui-web/Avatar/Avatar';
import pink from 'reactxx-mui-web/colors/pink';
import green from 'reactxx-mui-web/colors/green';
import { Icon } from 'reactxx-primitives'
import { Folder } from 'reactxx-mdi/Folder'
import { ClipboardText } from 'reactxx-mdi/ClipboardText'
import { FileFind } from 'reactxx-mdi/FileFind'


const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
};

function letterAvatars(props) {
  const { classes, $system: { classNames, classNamesStr } } = props;
  return (
    <div className={classNamesStr(classes.row)}>
      <Avatar className={classes.avatar}>L</Avatar>
      <Avatar className={classes.pinkAvatar}>N</Avatar>
      <Avatar className={classes.greenAvatar}>OP</Avatar>
    </div>
  );
}
const LetterAvatars = withStylesCreator(styles as any, letterAvatars)()



function iconAvatars(props) {
  const { classes, $system: { classNames, classNamesStr } } = props;
  return (
    <div className={classNamesStr(classes.row)}>
      <Avatar className={classes.avatar}>
        <Icon data={Folder} />
      </Avatar>
      <Avatar className={classes.pinkAvatar}>
        <Icon data={FileFind} />
      </Avatar>
      <Avatar className={classes.greenAvatar}>
        <Icon data={ClipboardText} />
      </Avatar>
    </div>
  );
}
const IconAvatars = withStylesCreator(styles as any, iconAvatars)()

function imageAvatars(props) {
  const { classes, $system: { classNames, classNamesStr } } = props;
  return (
    <div className={classNamesStr(classes.row)}>
      <Avatar alt="Remy Sharp" src="src/ks/common/muix/static/images/remy.jpg" className={classNames(classes.avatar)} />
      <Avatar
        alt="Adelle Charles"
        src="src/ks/common/muix/static/images/uxceo-128.jpg"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

const ImageAvatars = withStylesCreator(styles as any, imageAvatars)()

class App extends React.Component<any> {
  render() {
    const { classes, $system: { classNamesStr } } = this.props;
    return <div className={classNamesStr(classes.root)}>
      <h2>Image avatars</h2>
      <ImageAvatars />
      <h2>Icon avatars</h2>
      <IconAvatars />
      <h2>Letter avatars</h2>
      <LetterAvatars />
    </div>
  }
}

export default withStylesCreator(styles as any, App)()