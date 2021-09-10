import { ExtendedType } from './CustomTypes';
import { Distribute } from '../types';

export type ExtraValidators = ExtendedType<'Validator'>;

export type StandardValidators =
    | 'numeric'
    | 'integer';

export type Validator = Distribute<ExtraValidators|StandardValidators>;

export const Validator = {
};
