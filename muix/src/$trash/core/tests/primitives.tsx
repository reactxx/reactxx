
import { platform } from 'reactxx-sheeter'
import { View } from 'reactxx-primitives'

const App: React.SFC = props => <View
    classes={{ root: [{ backgroundColor: 'green' }] }}
    classNameX={[{ backgroundColor: 'red', width: 50, height: 50 }]}
    styleX={[{ width: 100 }, { width: 125, $web: { height: 100 } }, { width: 150 }]}>
</View>

export default App