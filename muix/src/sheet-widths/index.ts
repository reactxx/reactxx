export * from './pipe'

import { TSheeter } from 'reactxx-typings'

export type getBreakpoints<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['breakpoints']

//*********************************************************
//  PRIVATE
//*********************************************************

declare module 'reactxx-typings' {

    namespace TVariants {

        interface ShapePart {
            breakpoints?: TSheeter.EmptyInterface
        }
        interface PropsPart<R extends TSheeter.Shape = TSheeter.Shape> {
            breakpoints?: PropsBreakpoints<R, string>
        }
        interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
            breakpoints?: PropsBreakpoints<R, boolean>
        }
        
        type PropsBreakpoints<R extends TSheeter.Shape, T> = keyof getBreakpoints<R> extends never ? TSheeter.FakeInterface :
            Record<getBreakpoints<R>, T>

    }

}
