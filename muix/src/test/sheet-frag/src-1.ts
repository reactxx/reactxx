const source = {
  root: {
    $web: {
      $mediaq: {
        '480-640': {
          $whenUsed: {
            b: {
              $web: {
                ":hover": {
                  color: 'yellow'
                },
              },
            },
          },
        },
      },
      backgroundColor: 'blue',
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
    color: 'red',
    $mediaq: {
      '640-1024': {
        ':hover': {
          $whenUsed: {
            $web: {
              color: 'red',
            }
          },
        },
      },
    },
  }
}
