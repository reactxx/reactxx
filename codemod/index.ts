import { codeMod } from './tasks/index'
import { codeModDoc } from './tasks/index-doc'
import * as Config from './utils/config'

Config.setIsDoc(true); codeModDoc()

//Config.setIsDoc(false); codeMod()

