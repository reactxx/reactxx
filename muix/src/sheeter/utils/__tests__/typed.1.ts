import { TSheeter, TComponents, TCommonStyles, TAtomize } from 'reactxx-typings'
import ReactN from 'react-native';
import CSS from 'csstype';

type RulesetWeb = React.CSSProperties & { [P in CSS.Pseudos]?: any }

const T_Rules = <R extends RulesetIds>(...pars: TAllowed<R>[]) => pars[0]

type $W = '$W'; type $T = '$T'; type $V = '$V'; type $I = '$I'; type V = 'V'; type T = 'T'; type I = 'I';

type CommonIds = V | T | I
type RulesetIds = $W | $T | $V | $I | CommonIds

type RulesetType<R extends RulesetIds> =
  R extends V ? TCommonStyles.ViewStyle :
  R extends T ? TCommonStyles.TextStyle :
  R extends I ? TCommonStyles.ImageStyle :
  R extends $W ? RulesetWeb :
  R extends $T ? ReactN.TextStyle :
  R extends $V ? ReactN.ViewStyle :
  R extends $I ? ReactN.ImageStyle :
  never

type TAllowed<R extends RulesetIds> =
  R extends T ? T | V :
  R extends $T ? $T | $V | T | V :
  R extends $V ? $V | V :
  R extends $I ? $I | I :
  R

type TAllowedInput<R extends RulesetIds> = RulesetType<R> | TAllowed<R>

type TNative<R extends T | V | I> =
  R extends T ? $T :
  R extends V ? $V :
  R extends I ? $I :
  never

const $if = <T extends RulesetIds>(...r: TAllowedInput<T>[]) => null as TAllowed<T>
const $web = <T extends RulesetIds>(...r: TAllowedInput<$W>[]) => null as T
const $native = <R extends CommonIds>(...r: TAllowedInput<TNative<R>>[]) => null as R

const toClassNames = <T extends RulesetIds>(...rules: T[]) => rules[0]

// classNameX definition for Web, Native and Components

type TPlatformAllowed<R extends RulesetIds> =
  R extends $W ? $W | V | T | I :
  R extends T ? T | V | $W | $T | $V :
  R extends V ? V | $W | $V :
  R | $W

type TComponentAllowed<R extends T | V | I> =
  R extends T ? T | V | $W : R | $W

// COMPONENT example

const sheet3 = {
  root: T_Rules<V>(
    $web<V>(
      $if<$W>(),
    ),
    $native<V>(),
  ),
  label: T_Rules<T>(
    $if<T>({ color: '' }),
    $if<V>(),
    $web<T>()
  ),
  image: T_Rules<I>(
    $if<I>(),
    $web<I>()
  ),
  webOnly: T_Rules<$W>(
    $if<$W>(),
  ),
  nativeOnly: T_Rules<$V>(
    $if<$V>({transform:[]}),
    $if<V>(),
  ),
  nativeOnlyImage: T_Rules<$I>(
    $if<$I>(),
    $if<I>(),
  ),
  nativeOnlyText: T_Rules<$T>(
    $if<$V>({}),
    $if<V>(),
    $if<$T>({ color: '' }),
    $if<T>(),
  ),
}

const root = toClassNames(sheet3.root, sheet3.webOnly)
const nativeOnly = toClassNames(sheet3.root, sheet3.nativeOnly)
const webOnly = toClassNames(sheet3.root, sheet3.webOnly)
const webOnly2 = toClassNames(sheet3.root, sheet3.webOnly)
const label = toClassNames(sheet3.label)
const image = toClassNames(sheet3.image)

const Text: TPlatformAllowed<T> = root
const View: TPlatformAllowed<V> = webOnly2
const View3: TPlatformAllowed<V> = nativeOnly
const Image: TPlatformAllowed<I> = image
//const View2: TPlatformAllowed<V> = label // ERROR
const div: TPlatformAllowed<$W> = root
//const span: TPlatformAllowed<$W> = nativeOnly // ERROR
const i: TPlatformAllowed<$W> = webOnly

const C: TComponentAllowed<T> = label

