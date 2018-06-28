const mergeWeb = {
  root: {
    $mediaq: {
      '480-640': {
        $whenUsed: {
          a: {
            ":hover": {
              color: 'yellow'
            },
          },
        },
      },
      '640-1024': {
        ':hover': {
          $whenUsed: {
            color: 'red',
          },
        },
      },
    },
    $whenUsed: {
      a: {
        $mediaq: {
          '320-640': {
            color: 'green',
          },
        },
      },
    },
    backgroundColor: 'blue',
    color: 'red',
  }
}

