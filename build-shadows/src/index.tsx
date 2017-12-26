import shadows, { Shadows } from 'material-ui/styles/shadows'

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

const getShadows = () => shadows.map((web, idx) => ({
  web,
  native: getNativeShadow(idx)
} as IShadow))



const getNativeShadow = (deep: number) => {
  if (deep == 0) return {}
  return {
    shadowColor: '',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  }
}

export default getShadows