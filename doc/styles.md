# Common theming and styling for web and native

## Terminology

**Rule**: CSS in JS rule, e.g. ```color: red```

**Ruleset**: CSS in JS ruleset, e.g. 
  ```
  const ruleset = {
      color: 'red',
      display: 'none'
  }
  ```
**RulesetX**: cross platform Ruleset. 
For every react-natie style (ViewStyle, TextStyle, ImageStyle) it contains:
- cross platform rules, which are common for web and native (e.g. overflow:'hidden')
- platform specific rules (overflow:'auto' is not valid for native)

*Example 1*
```
    const view: RulesetX<ReactN.ViewStyle> = {} // cross platform Ruleset for native ViewStyle
    view.overflow = 'scroll' //ERROR, only "visible" | "hidden" are valid values for react native
    view.overflow = 'hidden' //OK
    view.color = 'red' //ERROR, ReactN.ViewStyle does not contain 'color' rule
```
*Example 2*
```
    const text: RulesetX<ReactN.TextStyle> = {} // cross platform Ruleset for native TextStyle
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
