import * as Ast from '../../utils/ast'
import * as Tasks from '../../utils/tasks/default'

export default [
    {
        path: 'ButtonBase/ButtonBase',
        transform: Tasks.taskDefaultCreator('ButtonBase')
    },
    {
        path: 'ButtonBase/Ripple',
        transform: Tasks.taskDefaultCreator('Ripple')
    },
    {
        path: 'ButtonBase/TouchRipple',
        transform: Tasks.taskDefaultCreator('TouchRipple')
    },
] as Ast.FileDescr[]