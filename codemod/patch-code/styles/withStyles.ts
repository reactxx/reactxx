import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks/index'

export const registerWithStyles = (specials: Specials) => specials['ButtonBase/TouchRipple'] = ({
    transformStr: code => `
    import withStyles from 'reactxx-muix/web/styles/withStyles'

    export default withStyles
    `
})


