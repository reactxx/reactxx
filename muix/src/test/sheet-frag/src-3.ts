const final = {
  addIns: {
    $mediaq: {
      root: {
        '480-640': {
        },
        '640-1024': {
          ':hover': {
          },
        },
      },
      'addIns/$whenUsed/root/a': {
        '320-640': {
          color: 'green',
        },
      }
    },
    $whenUsed: {
      root: {
        a: {
        }
      },
      'addIns/$mediaq/root/480-640': {
        b: {
          ":hover": {
            color: 'yellow'
          },
        },
      },
      'addIns/$mediaq/root/640-1024/:hover': {
        color: 'red'
      }
    },
  },
  root: {
    backgroundColor: 'blue',
    color: 'red',
  }
}
