import shadows from 'material-ui/styles/shadows'

export interface INativeShadow {
  shadowColor?: string;
  shadowOffset?: { width: number, height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}
export interface IShadow {
  web: string
  native: INativeShadow
}
export interface IShadows {
  items: IShadow[]
}

const android = [0, 2, 4, 9, 12, 15, 18, 20, 22, 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

const iosW = (deep: number) => {
  switch (deep) {
    case 0: case 1: return 0
    default: return deep / 10
  }
}

const iosH = (deep: number) => {
  switch (deep) {
    case 0: return 0
    default: return 0.7 + (deep - 1) * 0.7
  }
}

const iosOpacity = (deep: number) => {
  switch (deep) {
    case 0:
    case 1: return 0.7
    default: return 0.7 - deep * 0.02
  }
}

const iosRadius = (deep: number) => {
  switch (deep) {
    case 0: return 2
    case 1: return 3
    default: return 4 + deep * 0.1;
  }
}

const getNativeShadow = (deep) => {
  if (deep == 0) return {}
  return {
    shadowColor: 'black',
    shadowOffset: { width: iosW(deep), height: iosH(deep) },
    shadowOpacity: iosOpacity(deep),
    shadowRadius: iosRadius(deep),
    elevation: android[deep],
  }
}

const getShadows = () => shadows.map((web, idx) => ({
  web,
  native: getNativeShadow(idx)
} as IShadow))

export default getShadows