import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import {
  PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE,
  PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE_V2,
  ProcessAction,
  ProcessActionV2
} from '../actions/process.actions';
import { ProcessExtensionService } from '../process-extension.service';

@Injectable()
export class ProcessEffects {
  constructor(
    private actions$: Actions,
    private processExtensionService: ProcessExtensionService
  ) {}

  @Effect({ dispatch: false })
  aiDriversLicense$ = this.actions$.pipe(
    ofType<ProcessAction>(PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE),
    map(action => {
      if (action.payload) {
        this.processExtensionService.onAIApplyDriversLicenseData(
          action.payload
        );
      }
    })
  );

  @Effect({ dispatch: false })
  aiDriversLicenseV2$ = this.actions$.pipe(
    ofType<ProcessActionV2>(PROCESS_EXTENSION_AI_APPLY_DRIVERS_LICENSE_V2),
    map(action => {
      if (action.payload) {
        this.processExtensionService.onAIApplyPhaseTwo(action.payload);
      }
    })
  );
}
