import { Specials } from '../../tasks';
import * as Tasks from '../../tasks/default-modifier';


export const registerNativeSelectInput = (specials: Specials) => {
    specials['NativeSelect/NativeSelectInput'] = { transform: Tasks.classNamesFix() }
}
