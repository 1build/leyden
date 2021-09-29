import { ValidationFunc, ValidationFuncs } from 'leyden';

const onlyTwos: ValidationFunc = newVal => {
    for (let i = 0; i < newVal.length; i++) {
        if (newVal[i] !== '2') {
            return false;
        }
    }
    return true;
};

export const validators: ValidationFuncs = {
    onlyTwos,
};
