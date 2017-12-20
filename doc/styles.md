# Common theming and styling for web and native
*styles* add-in is very small, it contains only 600 lines of Typescript code

## Terminology

### Rule 
Platform specific rule, e.g. ```color: red```

### Ruleset
Platform specific ruleset, e.g. 
  ```js
  const ruleset = {
      color: 'red',
      display: 'none'
  }
  ```
### RulesetX
Cross platform Ruleset. It contains:
- cross platform part, which are common for web and native. Because there are three main native styles (ViewStyle, TextStyle, ImageStyle) this common part has three different versions
- platform specific part

*Example 1*
```js
    const view = { // cross platform Ruleset where native version inherits from react native ViewStyle
      //overflow: 'scroll', //ERROR, only "visible" or "hidden" are valid values for react native ViewStyle
      //color: 'red', //ERROR, react native ViewStyle does not contain 'color' rule property
      overflow: 'hidden', //OK
      web: {
        color: 'red', // OK, color: 'red' is valid for web
        overflow: 'scroll', // OK, overflow: 'scroll' is valid for web
      },
      native: {
        backgroundColor: 'lightgray' //different background color for native
      }
    } 
```
*Example 2*
```js
    const text = { // cross platform Ruleset where native version inherits from ReactNative.TextStyle
      color: 'red' //OK, react native TextStyle contains 'color' rule
    } 
```
*Example 3*
```js
    //following rulesets have the same result: 'overflow:visible' for react-native and 'overflow:auto' for web
    const ruleset = {
      overflow: 'visible',
      web: {
        overflow: 'auto',
      }
    }
    const ruleset2 = {
      native: {
        overflow: 'visible',
      },
      web: {
        overflow: 'auto',
      }
    }

    //error example
    const ruleset2 = {
      overflow: 'auto', //ERROR: only "visible" | "hidden" are valid values for ReactN.ViewStyle['overflow'] rule
      native: {
        overflow: 'visible',
      },
    }
```

### Sheet
Platform specific collection of named rulesets, e.g.
```js
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

```js
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
        fontWeight: '500'
      }
    }
  }
```

### React component props



## Idea

