import { codeMod } from './tasks'
import { codeModDoc } from './tasks/index-doc'
import iconsRun from './icons/index'

if (false) codeModDoc()

if (true) codeMod(false)

if (false) {
    iconsRun()
    codeMod(false)
}
