/*!
 * @license
 * Copyright 2019 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ExtensionService } from '@alfresco/adf-extensions';
import { CoreModule, StorageService } from '@alfresco/adf-core';
import { AiViewComponent } from './ai-view.component';
import { RenditionViewerService } from './rendition-viewer.service';
import { DrawService } from './draw.service';

import { MaterialModule } from './material.module';

export function components() {
  return [AiViewComponent];
}

@NgModule({
  imports: [CoreModule, BrowserModule, FormsModule, MaterialModule],
  providers: [RenditionViewerService, DrawService],
  declarations: components(),
  exports: components(),
  entryComponents: components()
})
export class AiViewModule {
  constructor(extensions: ExtensionService, storage: StorageService) {
    extensions.setComponents({
      'ai-extension.main.component': AiViewComponent
    });
    extensions.setEvaluators({
      'ai.viewer.disabled': () => storage.getItem('ai') !== 'true'
    });
  }
}
