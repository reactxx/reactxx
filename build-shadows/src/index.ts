import shadows from 'material-ui/styles/shadows'

export interface INativeShadow {
  shadowColor?: string;
  shadowOffset?: { width: number, height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}
const android = [0, 2, 4, 7, 10, 13, 16, 18, 20, 22, 24, 26, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

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
  if (deep == 0) return {} as INativeShadow
  return {
    shadowColor: 'black',
    shadowOffset: { width: iosW(deep), height: iosH(deep) },
    shadowOpacity: iosOpacity(deep),
    shadowRadius: iosRadius(deep),
    elevation: android[deep],
  } as INativeShadow
}

const getShadows = () => shadows.map((web, idx) => getNativeShadow(idx))

export default getShadows