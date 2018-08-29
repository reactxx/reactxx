import { codeMod } from './tasks'
import { codeModDoc } from './tasks/index-doc'
import iconsRun from './icons/index'

if (true) codeModDoc()

if (false) codeMod(false)

if (false) {
    iconsRun()
    codeMod(false)
}
