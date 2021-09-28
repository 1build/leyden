import { LeydenEditor } from '../interfaces/LeydenEditor';
import { OperationSubscriber } from './types';

export const OPERATION_SUBSCRIBERS: WeakMap<LeydenEditor, Set<OperationSubscriber>> = new WeakMap();
