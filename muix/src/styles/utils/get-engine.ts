import { TTyped } from 'reactxx-typings';
import { 
    THEMED, QUERY, COMPILE, STYLE, WIDTH, WEB, NATIVE, HOT, IF, IFELSE, COMPONENT
} from '../queryable/index'

export const getTypedEngine = <R extends TTyped.Shape>() => engine as TTyped.TypedEngine<R>

const engine = {
    WEB,
    NATIVE,
    STYLE,
    COMPILE,
    HOT,
    IF,
    IFELSE,
    WIDTH,
    THEMED,
    QUERY,
    COMPONENT,
}

