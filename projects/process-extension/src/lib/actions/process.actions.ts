import { Action } from '@ngrx/store';
import { MinimalNodeEntryEntity } from '@alfresco/js-api';

export const PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE =
  'PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE';
export const PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE_V2 =
  'PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE_V2';

export class ProcessAction implements Action {
  readonly type = PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE;
  constructor(public payload: MinimalNodeEntryEntity) {}
}

export class ProcessActionV2 implements Action {
  readonly type = PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE_V2;
  constructor(public payload: MinimalNodeEntryEntity) {}
}
