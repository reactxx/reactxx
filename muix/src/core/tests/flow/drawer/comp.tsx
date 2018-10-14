/** @jsx createElement */

import { createElement } from 'reactxx-sheeter'

import { TComponents } from 'reactxx-typings'

const Comp: TComponents.SFCCode = ({ classNameX }) => {
    return <div classNameX={classNameX as any}><span></span></div>
}

export default Comp
