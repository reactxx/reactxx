//https://github.com/alekhurst/react-native-elevated-view/blob/master/index.js

import { Platform } from 'react-native'
import range from 'lodash/range'

const round = (value: number) => Math.round(value * 1e5) / 1e5
const shadow = (deep: number) => {
  if (deep == undefined) return null
  return {
    elevation: round(elev = elev + 0.25),
    shadowOpacity: 0.24, //round(0.0015 * deep + 0.18),
    shadowRadius: round(0.54 * deep),
    shadowOffset: {
      height: 0.6 * deep,
    },
  } as ReactN.ViewStyle
}

let elev = 0.25

export const shadows: Array<ReactN.ViewStyle> = [
  //{ elevation: 1, shadowOpacity: 0, shadowOffset: { width: 0, height: 1 }, shadowColor: 'rgba(0, 0, 0, 0.2)', shadowRadius: 3 },
  {},
  ...range(1, 25).map(idx => shadow(idx))
]

export type Shadows = typeof shadows
export default shadows
