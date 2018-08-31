import React from 'react'
import { siteMap, pathToObjs, SitemapNode } from '../muix-doc/meta'
import Markdown from './MarkdownElement'
import CssBaseline from 'reactxx-mui-web/CssBaseline/CssBaseline'

abstract class NodeAble extends React.Component<{ node?: SitemapNode }, { node: SitemapNode }> {
  state = { node: siteMap[0] }
}

class LeftMenu extends NodeAble { 
  render() {
    return null
  }
}

class Content extends  NodeAble {
  render() {
    const {node} = this.props
    const markup = pathToObjs[node.dir] as string
    return <Markdown text={markup}/>
  }
}

class App extends NodeAble {
  render() {
    return <React.Fragment>
      <LeftMenu node={this.state.node}/>
      <Content node={this.state.node}/>
    </React.Fragment>
  }
}

export default App;
