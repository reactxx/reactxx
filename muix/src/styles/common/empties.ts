const emptyRecord = (props: string[]) => {
  const res = {}
  props.forEach(p => res[p] = {})
  return res
}

export const emptyTypography: Mui.web.Typography & Mui.native.Typography = {
  fontSize: 0, htmlFontSize: 0, fontFamily: '', fontWeightLight: 'normal' as any, fontWeightRegular: 'normal', fontWeightMedium: 'normal', fontSizeNormalizerNative: s => s, fontAssetPathNative: '',
  fontsNative: emptyRecord(['light', 'regular', 'medium']) as any,
  ...emptyRecord(['display1', 'display2', 'display3', 'display4', 'headline', 'title', 'subheading', 'body1', 'body2', 'caption', 'button']) as any,
}

const shadows = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

export const emptyShadowsWeb = shadows.map(n => '')
export const emptyShadowsNative = shadows.map(n => { })