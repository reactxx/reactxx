import React from 'react'
import ReactDOM from 'react-dom'

import { ScrollView, View, Text } from 'muix-primitives'

import shadows from 'material-ui/styles/shadows'
//import { IShadow } from 'muix-shadows'

//const getShadows = () => shadows.map((web, idx) => ({
//  web,
//  native: getNativeShadow(idx)
//} as IShadow))

//const deeps = [2, 4, 9, 12, 15, 18, 16, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

//const getNativeShadow = (deep: number) => {
//  if (deep == 0) return {}
//  return {
//    shadowColor: 'gray',
//    shadowOffset: { width: 10, height: 0 },
//    shadowOpacity: 0.5,
//    shadowRadius: 5,
//    elevation: deeps[deep],
//  }
//}

//const style: Mui.ViewStyleCommon = {
//  width: 50,
//  height: 50,
//  margin: 25,
//  borderWidth: 1,
//  borderColor: 'brown',
//  borderStyle: 'solid',
//  backgroundColor: 'lightgray',
//  flexShrink: 0,
//}

//const AppComp: React.SFC = props => <ScrollView>
//  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//    {getShadows().map((sh, idx) => <View key={idx} style={{ ...style, native: sh.native, web: { boxShadow: sh.web } }} />)}
//  </View>
//</ScrollView>

//export default AppComp


