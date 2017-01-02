import { Request } from './request';
import { StateLoading, StateEmpty, StateError } from './states';

export * from './request';
export * from './states';

export const COMPONENTS = [
  Request,
  StateLoading,
  StateEmpty,
  StateError
]
