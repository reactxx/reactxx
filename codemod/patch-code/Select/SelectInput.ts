import { Specials } from '../../tasks';
import * as Tasks from '../../tasks/default-modifier';

export const registerSelectInput = (specials: Specials) => {
    specials['Select/SelectInput'] = { transform: Tasks.classNamesFix() }
}
