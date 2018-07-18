import * as fs from 'fs'
import * as fsExtra from 'fs-extra';
import * as Config from './utils/config'
import * as Parser from './utils/parser'

import Button from './patch-code/Button/button'
import ButtonBase from './patch-code/ButtonBase/ButtonBase'

const patches = [
    Button,
    ButtonBase
]

export const codeMod = () => {
    patches.forEach(patchs => patchs.forEach(patch => {
        const srcPath = Config.src + patch.path + '.js'
        const origPath = Config.patchOriginal + patch.path + '.js'
        if (!fs.existsSync(origPath)) fsExtra.moveSync(srcPath, origPath)
        const ast = Parser.parseFile(origPath)
        patch.transform(ast)
        Parser.generateFile(ast, srcPath)
    }))
}

codeMod()

//const prettydiffOutput = format('//x', { parser: (text, parsers, options) => ast })
