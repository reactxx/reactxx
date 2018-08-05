import * as Ast from '../../utils/ast'
import * as Tasks from '../../tasks/default-modifier'
import * as Parser from '../../utils/parser'
import * as Queries from '../../utils/queries'

import { Specials } from '../../tasks';

export const registerGrid = (specials: Specials) => {
    specials['Grid/Grid'] = {
        transform: (ast, info) => {
            const res = Tasks.withStylesTaskDefaultCreator()(ast, info)
            // add 
            const itemStyle = Queries.checkSingleResult(Ast.astq().query(ast, 
                '/Program/ExportNamedDeclaration/VariableDeclaration/VariableDeclarator [ /Identifier [@name=="styles"] ] //ObjectExpression/ObjectProperty [ /Identifier [ @name == "item"] ] '))
            itemStyle.value.properties.push({
                "type": "ObjectProperty",
                "method": false,
                "key": {
                    "type": "StringLiteral",
                    "value": `NAME$${gridItemClassName}`
                },
                "computed": false,
                "shorthand": false,
                "value": {
                    "type": "BooleanLiteral",
                    "value": true
                }
            })
            // replace generateGutter
            const program = Queries.checkSingleResult(Ast.astq().query(res, `/Program`))
            const generateGutter = Queries.checkSingleResult(Ast.astq().query(program, `/FunctionDeclaration [ /Identifier [@name == "generateGutter"] ]`))
            const idx = program.body.indexOf(generateGutter)
            program.body.splice(idx, 1, Parser.parseCode(`
            function generateGutter(theme, breakpoint) {
                const styles = {};
                GUTTERS.forEach((spacing, index) => {
                    if (index === 0) {
                        // Skip the default style.
                        return;
                    }
                    
                    styles[\`spacing-\${breakpoint}-\${spacing}\`] = {
                        ...toAtomic('margin', -spacing / 2),
                        width: \`calc(100% + \${spacing}px)\`,
                        //'& > $item': {
                        '& > .${gridItemClassName}': {
                            ...toAtomic('padding', spacing / 2),
                        }
                    };
                });
                return styles;
            } 
            `))
            return res
        }
    }
}
const gridItemClassName = 'grid_item'