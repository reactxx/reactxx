import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Parser from '../../utils/parser'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks'

export const registerInput = (specials: Specials) => {
    specials['Input/Input'] = {
        transform: (ast, info) => {
            const func = info.renderFunc
            const body = func.body.body as any[];
            const returnIdx = body.findIndex(node => node.type === 'ReturnStatement')
            //************ CLASSNAMES
            //body.splice(returnIdx, 0, Parser.parseCode("if (typeof InputComponent === 'string') inputClassName = classNamesStr(inputClassName); else inputProps.$system = this.props.$system;"))
            body.splice(returnIdx, 0, Parser.parseCode("if (typeof InputComponent !== 'string') inputProps.$system = this.props.$system;"))
            const res = Tasks.withStylesTaskDefaultCreator()(ast, info)
            return res
        }
    }
}
