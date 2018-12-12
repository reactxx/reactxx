import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'
import { getTypedEngine, toClassNamesWithQuery } from 'reactxx-styles'




interface Shape {
  theme: {primary}
  sheetQuery: {enabled}  
}

const { THEMED, IF, WEB, NATIVE, STYLE, COMPILE
} = getTypedEngine<Shape>()

// type TT<R extends TTyped.RulesetIds = V> = (...r: TTyped.Ruleset<R>[]) => R
// let iff: TT

// const r = iff<T>({},iff('V'))

const sheet4 = THEMED(theme => ({
  root: STYLE<V>(
    IF<V>(p => p.enabled, { backgroundColor: theme.primary })
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

