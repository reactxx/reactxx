import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Queries from '../../utils/queries'

export default [
    {
        path: 'Typography/Typography',
        transform: Tasks.taskDefaultCreator('Typography')
    }

] as Ast.FileDescr[]