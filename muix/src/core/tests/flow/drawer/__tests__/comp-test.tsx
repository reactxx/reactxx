/** @jsx createElement */

import { createElement } from 'reactxx-sheeter'

import { shallow } from '../../../../../tests/jestsetup'

import Comp from '../comp'

describe('Comp 1', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Comp />)
        expect(wrapper).toMatchSnapshot()
    })
})

test('Comp 2', () => {
    const wrapper = shallow(<Comp />)
    expect(wrapper).toMatchSnapshot()
})
