import * as Ast from '../../utils/ast'
import * as Tasks from '../../utils/tasks/default'

export default [{
    path: 'Button/Button',
    transform: Tasks.taskDefaultCreator('Button')
}] as Ast.FileDescr[]