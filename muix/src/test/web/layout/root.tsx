import React from 'react'

const scrollViewStyle = { flexBasis: 0, flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', } as React.CSSProperties

const View: React.SFC<{ style }> = props => {
  const { style, ...rest } = props
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexBasis: 'auto', ...style }} {...rest} />
}
const ScrollView = View
const Text: React.SFC = props => <span {...props} />

const app: React.SFC = props => <View style={{ flex: 1 }}>
  <View style={{ backgroundColor: 'yellow' }}>
    <Text>
      YYYY
      asdf asd fsadf a as df asd fas df asd fas df asdf s ads asdf asd fsadf 
      XXXX
    </Text>
  </View>
  <ScrollView style={{ ...scrollViewStyle, backgroundColor: 'lightgray', }}>
    <View style={{}}>
      <Text>
        YYYY
        asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd
        asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd
        asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd
        asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd asdfas df ad fa sdf as fd asd f asd fas df asd
        XXXX
    </Text>
    </View>
  </ScrollView>
  <View style={{ backgroundColor: 'gray' }}>
    <Text>
      YYYY
      asdf asd fsadf a as df asd fas df asd fas df asdf s ads asdf asd fsadf 
      XXXX
    </Text>
  </View>
</View>

export default app