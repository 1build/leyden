import { ExtendableTypeIsExtended, ExtendedType } from './CustomTypes';
import { Distribute } from '../utils/types';

export type ExtraValidators = ExtendedType<'Validator'>;
export type ValidatorIsExtended = ExtendableTypeIsExtended<'Validator'>;

export type StandardValidators =
    | 'empty'
    | 'numeric'
    | 'integer';

export type ValidationFunc = (newVal: string) => boolean;

export type ValidationFuncs = {
    [T in ExtraValidators]: ValidationFunc;
};

export type Validator = Distribute<ExtraValidators|StandardValidators>;

export interface ValidatorInterface {
    getValidationFunc: (
        validators: ValidationFuncs,
        validator: Validator,
    ) => ValidationFunc;
    isEmpty: ValidationFunc;
    isInteger: ValidationFunc;
    isNumeric: ValidationFunc;
}

export const Validator: ValidatorInterface = {
    /**
     * Returns the appropriate validation function for `validator`, pulling from `validators` if not defined here 
     */

    getValidationFunc(validators, validator) {
        const allValidators = {
            'empty': Validator.isEmpty,
            'integer': Validator.isInteger,
            'numeric': Validator.isNumeric,
            ...validators,
        };
        return allValidators[validator];
    },

    /**
     * Returns `true` if `val` is an empty string.
     */

    isEmpty(val: string): boolean {
        return val === '';
    },

    /**
     * Returns `true` if `val` is an integer string ('' counts as 0).
     */

    isInteger(val: string): boolean {
        return /^[,\d]*$/.test(val) && Validator.isNumeric(val);
    },

    /**
     * Returns `true` if `val` is a numeric string.
     */

    isNumeric(val: string): boolean {
        return !isNaN(Number(val.replaceAll(',', '')));
    },
};
