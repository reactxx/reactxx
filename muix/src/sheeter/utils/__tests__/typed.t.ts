import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'
import { getEngine } from '../../utils/get-engine'




interface Shape {
  theme: {primary}
  sheetQuery: {enabled}  
}

const { THEMED, IF, WEB, NATIVE, STYLE, $toClassNames, ATOMIZE
} = getEngine<Shape>()

// type TT<R extends TTyped.RulesetIds = V> = (...r: TTyped.Ruleset<R>[]) => R
// let iff: TT

// const r = iff<T>({},iff('V'))

const sheet4 = THEMED(theme => ({
  root: STYLE<V>(
    IF<V>(p => p.$sheetQuery.enabled, { backgroundColor: theme.primary })
  )
}))

const sheet3 = {
  root: STYLE<V>(
    {
      margin: 0,

    },
    WEB(
      {},
      IF<$W>(null),
      {
        cursor: '',
        ':hover': IF<$W>(null),
        ':active': [
          IF<$W>(null),
        ]
      }
    ),
    NATIVE<$V>(),
  ),
  label: STYLE<T>(
    IF<T>(null, { color: '' }),
    IF<V>(null),
    WEB()
  ),
  image: STYLE<I>(
    IF<I>(null),
    WEB()
  ),
  webOnly: STYLE<$W>(
    IF<$W>(null),
  ),
  nativeOnly: STYLE<$V>(
    {
      transform: []
    },
    IF<$V>(null, { transform: [] }),
    IF<V>(null),
  ),
  nativeOnlyImage: STYLE<$I>(
    IF<$I>(null),
    IF<I>(null),
  ),
  nativeOnlyText: STYLE<$T>(
    IF<$V>(null, {}),
    IF<V>(null),
    IF<$T>(null, { color: '' }),
    IF<T>(null),
  ),
}

const root = $toClassNames(null, sheet3.root, sheet3.webOnly)
const nativeOnly = $toClassNames(null, sheet3.root, sheet3.nativeOnly)
const webOnly = $toClassNames(null, sheet3.root, sheet3.webOnly)
const webOnly2 = $toClassNames(null, sheet3.root, sheet3.webOnly)
const label = $toClassNames<T>(null, sheet3.label, ATOMIZE<V>({}))
const image = $toClassNames(null, sheet3.image)

const Text: TTyped.TPlatformAllowed<$T> = root
const View4: TTyped.TPlatformAllowed<$V> = root
const View: TTyped.TPlatformAllowed<$V> = webOnly2
const View3: TTyped.TPlatformAllowed<$V> = nativeOnly
const Image: TTyped.TPlatformAllowed<$I> = image
//const View2: TPlatformAllowed<V> = label // ERROR
const div: TTyped.TPlatformAllowed<$W> = root
//const span: TPlatformAllowed<$W> = nativeOnly // ERROR
const i: TTyped.TPlatformAllowed<$W> = webOnly

//const C: TTyped.TComponentAllowed<T> = label

