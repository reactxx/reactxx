# Common theming and styling for web and native
*styles* add-in is very small, it contains only 600 lines of Typescript code

## Terminology

### Rule 
Platform specific rule, e.g. ```color: red```

### Ruleset
Platform specific ruleset, e.g. 
  ```
  const ruleset = {
      color: 'red',
      display: 'none'
  }
  ```
### RulesetX
Cross platform Ruleset. It contains:
- cross platform part, which are common for web and native
- platform specific part

*Example 1*
```
    const view: RulesetX<ReactN.ViewStyle> = {} // cross platform Ruleset where native version is ViewStyle
    view.overflow = 'scroll' //ERROR, only "visible" or "hidden" are valid values for react native
    view.overflow = 'hidden' //OK
    view.color = 'red' //ERROR, ReactN.ViewStyle does not contain 'color' rule
```
*Example 2*
```
    const text: RulesetX<ReactN.TextStyle> = {} // cross platform Ruleset where native version is TextStyle
    text.color = 'red' //OK, react native contains 'color' rule
```
*Example 3*
```
    //following rulesets have the same result: 'overflow:visible' for react-native and 'overflow:auto' for web
    const ruleset: RulesetX<ReactN.ViewStyle> = {
      overflow: 'visible',
      web: {
        overflow: 'auto',
      }
    }
    const ruleset2: RulesetX<ReactN.ViewStyle> = {
      native: {
        overflow: 'visible',
      },
      web: {
        overflow: 'auto',
      }
    }

    //error example
    const ruleset2: RulesetX<ReactN.ViewStyle> = {
      overflow: 'auto', //ERROR: only "visible" | "hidden" are valid values for ReactN.ViewStyle['overflow'] rule
      native: {
        overflow: 'visible',
      },
    }
```

### Sheet
Platform specific collection of named rulesets, e.g.
```
    const sheet = {
      root: { // 'root' ruleset
        marginTop: 10,
        backgroundColor: 'blue'
      },
      label; { // 'label' ruleset
        color: 'red'
      }
    }
```

### SheetX
Cross platform Sheet. 

```
  const sheetX = {
    common: { 
      raised: { // both web and native version of component use 'raised' ruleset
        backgroundColor: 'gray',
        web: {
          color: 'white',
        },
      },
      //... other common rulesets
    },
    native: {
      raisedLabel: { // only native version of component uses 'raisedLabel' ruleset
        color: 'gray',
      }
    },
    web: { 
      label: { // only web version of component uses 'label' ruleset
      }
    }
  }
```

## Idea

