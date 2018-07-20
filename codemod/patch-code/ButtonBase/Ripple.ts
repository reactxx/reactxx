import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks'

export const registerRipple = (specials: Specials) => specials['ButtonBase/Ripple'] = ({
    transform: Tasks.taskDefaultCreator('Ripple')
})
