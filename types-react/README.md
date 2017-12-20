# reactx-types-react
Patch of @types/react which allows  limited sharing of style sheets among React and ReactNative

## Installation

Instead of ```npm install --save-dev @types/react``` use:

```sh
npm install --save-dev "git+https://github.com/PavelPZ/reactx-types-react.git"
```

## @types/react changes

#### 1. ```CSSProperties.fontWeight```
... to be compatible with ReactNative.TextStyle.fontWeight, fontWeight looks as follows 
```
fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
```

#### 2. ```CSSProperties``` is separated to two interfaces (CSSPropertiesLow and CSSProperties)
- ```CSSPropertiesLow``` contains all ```CSSProperties``` props except for:
```
transform?: CSSWideKeyword | any; //removed because "transform" rule definition is very different in RN and React
[propertyName: string]: any; //removed because "keyof CSSProperties" returns unusable result
```
- ```CSSProperties``` is then defined as:
```
interface CSSProperties extends CSSPropertiesLow {
  transform?: CSSWideKeyword | any;
  [propertyName: string]: any;
}
```

--------------------------


These changes enable limited sharing of style sheets, e.g.

```
// type definition
type TakeFrom<T, K extends keyof T> = {[P in K]: T[P]}
type NativeCSS = RN.TextStyle | RN.ViewStyle | RN.ImageStyle
type CommonCSS<TNative extends NativeCSS> = TakeFrom<TNative, keyof CSSPropertiesLow & keyof TNative>

//stylesheet def
const style: CommonCSS<RN.TextStyle> = { 
  fontWeight: '300',
  color: 'black'
}

const style2: CommonCSS<RN.ViewStyle> = {
  marginTop: 30;
}


//using in RN
const txt = <Text style={style}>Hallo world</Text>
const view = <View style={style2}/>

//using in react
const span = <span style={style}>Hallo world</span>
const div = <div style={style2}/>
```





