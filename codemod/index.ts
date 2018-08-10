import { codeMod } from './tasks/index'
import { codeModDoc } from './tasks/index-doc'
import * as Config from './utils/config'
//import {readAllCodes} from './tasks'
//import {test} from './tasks/cssjs-to-fela'

if (Config.isDoc)
    codeModDoc()
else
    codeMod()
//test()
