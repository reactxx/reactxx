import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks'

//TODO 
//před return RENDER funkce dat:
//if (typeof InputComponent === 'string') inputClassName = classNamesStr(inputClassName)

export const registerInput = (specials: Specials) => {
    specials['Input/Input'] = { transform: Tasks.withStylesTaskDefaultCreator(['InputComponent']) }
}
