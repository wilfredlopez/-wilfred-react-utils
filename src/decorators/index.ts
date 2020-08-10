import {Memoize,  clearMemoizeCache} from './methods/memoize'
import {Rejectable} from './methods/Rejectable'
import {ReadOnly} from './methods/ReadOnly'
import {Validate} from './accesors/Validate'
import {ConsoleLog} from './methods/ConsoleLog'

export const Decorators = {
    Memoize,
    clearMemoizeCache,
    Rejectable,ReadOnly, Validate, ConsoleLog
}


export default Decorators