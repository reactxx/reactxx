import React from 'react'
import ReactDOM from 'react-dom'
import { mi2Mdi } from './mi2mdi'
import { miIcons } from './mui-icons'
import Case from 'change-case'

class App extends React.Component {
    state = { loaded: false }
    async componentDidMount() {
        await loadMi()
        this.setState({ loaded: true })
    }
    render() {
        return this.state.loaded ? 'LOADED' : 'Loading...'
    }
}

async function loadMi() {
    const allNames = Object.keys(miIcons).map(p => p.substr(0, p.length-5))
    const promises = allNames.map(icon => import(`jspm_packages/npm/@material-ui/icons@2.0.1/${icon}`))
    await Promise.all(promises)
        /*
'3d rotation' is named ThreeDRotation
'4k' is named FourK
'360' is named ThreeSixty
         */
}

ReactDOM.render(<App />, document.getElementById('root'))

