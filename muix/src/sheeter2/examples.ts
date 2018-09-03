const sheet3 = {
  $before: {
    $whenUsed: {
      selector2: {
        rule4: 20,
      }
    }    
  },
  $whenUsed: {
    selector2: {
      rule4: 30,
    }
  }    

}


const sheet2 = {
  selector1: {
    ':hover': {
      $whenUsed: {
        selector2: {
          rule4: 20,
          $mediaq: {}
        }
      },
    },
    $whenUsed: {
      selector2: {
        rule5: 30,
      }
    }
  }
}

const sheet22 = {
  selector1: {
    $whenUsed: {
      selector2: {
        rule5: 30,
        ':hover': {
          rule4: 20,
        }
      }
    }
  }
}

const sheet = {
  selector1: {
    rule1: 1,
    rule2: 1,
    ':hover': {
      $whenUsed: {
        selector2: {
          rule4: 20,
        }
      }
    },
    $whenUsed: {
      selector2: {
        rule4: 20,
        rule1: 21,
        rule2: 22,
      }
    }
  },
  selector2: {
    rule1: 2,
    rule3: 2,
  }
}

const className1 = [sheet.selector1, sheet.selector2]
const className2 = [sheet.selector2, sheet.selector1]