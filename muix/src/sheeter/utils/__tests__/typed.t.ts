import { $W, $T, $V, $I, V, T, I, TTyped } from 'reactxx-typings'
import { getTypedEngine } from '../../../use-sheeter/utils/typed'

interface Shape {
  theme: {primary}
  sheetQuery: {enabled}  
}

const { $themed, $if, $web, $native, $rules, $toClassNames, $atomizeRuleset
} = getTypedEngine<Shape>()

const sheet4 = $themed(theme => ({
  root: $rules<V>(
    $if<V>(p => p.$sheetQuery.enabled, { backgroundColor: theme.primary })
  )
}))

const sheet3 = {
  root: $rules<V>(
    {
      margin: 0,

    },
    $web<V>(
      {},
      $if<$W>(null),
      {
        cursor: '',
        ':hover': $if<$W>(null),
        ':active': [
          $if<$W>(null),
        ]
      }
    ),
    $native<V>(),
  ),
  label: $rules<T>(
    $if<T>(null, { color: '' }),
    $if<V>(null),
    $web<T>()
  ),
  image: $rules<I>(
    $if<I>(null),
    $web<I>()
  ),
  webOnly: $rules<$W>(
    $if<$W>(null),
  ),
  nativeOnly: $rules<$V>(
    {
      transform: []
    },
    $if<$V>(null, { transform: [] }),
    $if<V>(null),
  ),
  nativeOnlyImage: $rules<$I>(
    $if<$I>(null),
    $if<I>(null),
  ),
  nativeOnlyText: $rules<$T>(
    $if<$V>(null, {}),
    $if<V>(null),
    $if<$T>(null, { color: '' }),
    $if<T>(null),
  ),
}

const root = $toClassNames(null, sheet3.root, sheet3.webOnly)
const nativeOnly = $toClassNames(null, sheet3.root, sheet3.nativeOnly)
const webOnly = $toClassNames(null, sheet3.root, sheet3.webOnly)
const webOnly2 = $toClassNames(null, sheet3.root, sheet3.webOnly)
const label = $toClassNames<T>(null, sheet3.label, $atomizeRuleset<V>([{}]))
const image = $toClassNames(null, sheet3.image)

const Text: TTyped.TPlatformAllowed<T> = root
const View: TTyped.TPlatformAllowed<V> = webOnly2
const View3: TTyped.TPlatformAllowed<V> = nativeOnly
const Image: TTyped.TPlatformAllowed<I> = image
//const View2: TPlatformAllowed<V> = label // ERROR
const div: TTyped.TPlatformAllowed<$W> = root
//const span: TPlatformAllowed<$W> = nativeOnly // ERROR
const i: TTyped.TPlatformAllowed<$W> = webOnly

const C: TTyped.TComponentAllowed<T> = label

