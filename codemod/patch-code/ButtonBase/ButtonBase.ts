import * as Ast from '../../utils/ast'
import * as Tasks from '../../utils/tasks/default'

export default [
    {
        path: 'ButtonBase/ButtonBase',
        transform: Tasks.taskDefaultCreator('ButtonBase', ['ComponentProp'])
    },
    {
        path: 'ButtonBase/Ripple',
        transform: Tasks.taskDefaultCreator('Ripple')
    },
    {
        path: 'ButtonBase/TouchRipple',
        transform: Tasks.taskDefaultCreator('TouchRipple', ['TransitionGroup'])
    },
] as Ast.FileDescr[]