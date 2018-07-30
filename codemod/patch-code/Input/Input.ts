import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Parser from '../../utils/parser'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks'

//TODO 
//před return RENDER funkce dat:
//if (typeof InputComponent === 'string') inputClassName = classNamesStr(inputClassName); else inputProps.$system = this.props.$system;

export const registerInput = (specials: Specials) => {
    specials['Input/Input'] = {
        transform: (ast, info) => {
            const res = Tasks.withStylesTaskDefaultCreator(['TransitionGroup'])(ast, info)
            //před 'return' of RENDER funkce dat:
            const func = Tasks.getRenderFunc(res, info.name)
            const body = func.body.body as any[];
            const returnIdx = body.findIndex(node => node.type === 'ReturnStatement')
            body.splice(returnIdx, 0, Parser.parseCode("if (typeof InputComponent === 'string') inputClassName = classNamesStr(inputClassName); else inputProps.$system = this.props.$system;"))
            //if (typeof InputComponent === 'string') inputClassName = classNamesStr(inputClassName); else inputProps.$system = this.props.$system;
            return res
        }
    }
}
