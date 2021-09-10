import { ExtendedType } from './CustomTypes';
import { Distribute } from '../types';

export type ExtraValidators = ExtendedType<'Validator'>;

export type StandardValidators =
    | 'numeric'
    | 'integer';

export type ValidationFunc = (newVal: string) => boolean;

export type ValidationFuncs = {
    [T in ExtraValidators]: ValidationFunc;
};

export type Validator = Distribute<ExtraValidators|StandardValidators>;

export interface ValidatorInterface {
    isInteger: ValidationFunc;
    isNumeric: ValidationFunc;
}

export const Validator: ValidatorInterface = {
    /**
     * Returns `true` if `val` is an integer string ('' counts as 0)
     */

    isInteger: val => /^[,\d]*$/.test(val) && Validator.isNumeric(val),

    /**
     * Returns `true` if `val` is a numeric string.
     */

    isNumeric: val => !isNaN(Number(val)),
};
