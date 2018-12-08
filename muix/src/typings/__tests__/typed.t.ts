import { TTyped, T, V } from 'reactxx-typings'

interface ShapeX extends TTyped.ShapeAncestor {
    sheet: {
        root: T
    }
}
interface ShapeX2 extends TTyped.ShapeAncestor {
    sheet: {
        root: T
        label: V
    }
}
interface ShapeX3 extends TTyped.ShapeAncestor {
    sheet: {
        label: V
    }
}

interface ShapeX4 extends TTyped.ShapeAncestor {
}


type T1 = TTyped.getSheet<ShapeX>
type T2 = TTyped.getRootStyle<ShapeX>
type T3 = TTyped.Sheet<ShapeX>

type Ta1 = TTyped.getSheet<ShapeX2>
type Ta2 = TTyped.getRootStyle<ShapeX2>
type Ta3 = TTyped.Sheet<ShapeX2>

type Tb1 = TTyped.getSheet<ShapeX3>
type Tb2 = TTyped.getRootStyle<ShapeX3>
type Tb3 = TTyped.Sheet<ShapeX3>

type Tc1 = TTyped.getSheet<ShapeX4>
type Tc2 = TTyped.getRootStyle<ShapeX4>
type Tc3 = TTyped.Sheet<ShapeX4>
