/** @jsx createElement */
import { createElement } from 'reactxx-core'
import { View } from 'reactxx-primitives'

const App: React.SFC = props => <View 
    classes={{root: {backgroundColor: 'green'}}}
    classNameX={[{backgroundColor: 'red', width: 50, height: 50}]}
    styleX={[{width: 100}, {height: 100}, {width: 150}]}>
</View>

export default App