import React from 'react'

import { TSheets } from 'reactxx-typings'
import { ScrollView, LoremIpsum, } from 'reactxx'
import { H1, H2, H3, H4, H5, U, I, B, A, Blocquote, P } from '../components/typo'

const App: React.SFC = props => <ScrollView  classes={{ container: { padding: 10 } }}>
  <H1>H1 {LoremIpsum(5)}</H1>
  <H2>H2 {LoremIpsum(5)}</H2>
  <H3>H3 {LoremIpsum(5)}</H3>
  <H4>H4 {LoremIpsum(5)}</H4>
  <H5>H5 {LoremIpsum(5)}</H5>
  <P>
    P {LoremIpsum(5)} 
    {LoremIpsum(10)}
    <B>B {LoremIpsum(5)}</B>
    {LoremIpsum(10)}
    <I>I {LoremIpsum(5)}</I>
    {LoremIpsum(10)}
    <U>U {LoremIpsum(5)}</U>
    {LoremIpsum(10)}
    <A onPress={() => alert('Its me!')}>A {LoremIpsum(5)}</A>
    {LoremIpsum(10)}
  </P>
  <Blocquote>
    <B>Blocquote</B>
    {LoremIpsum(80)}
  </Blocquote>
</ScrollView>

export default App

