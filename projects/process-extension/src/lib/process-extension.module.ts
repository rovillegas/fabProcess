import { NgModule } from '@angular/core';
import { ProcessExtensionComponent } from './process-extension.component';
import { TasksComponentComponent } from './tasks/tasks-component/tasks-component.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { StartProcessComponentComponent } from './process/start-process-component/start-process-component.component';
import { ExtensionService } from '@alfresco/adf-extensions';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule } from '@alfresco/adf-core';
import { ContentModule } from '@alfresco/adf-content-services';
import { DashboardComponentComponent } from './customer/dashboard-component/dashboard-component.component';
import { SearchComponent } from './customer/search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ProcessEffects } from './effects/process.effects';

@NgModule({
  declarations: [
    ProcessExtensionComponent,
    TasksComponentComponent,
    TaskDetailsComponent,
    StartProcessComponentComponent,
    DashboardComponentComponent,
    SearchComponent
  ],
  imports: [
    ProcessModule.forRoot(),
    CoreModule.forRoot(),
    ContentModule.forRoot(),
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    EffectsModule.forFeature([ProcessEffects])
  ],
  exports: [ProcessExtensionComponent],
  entryComponents: [
    ProcessExtensionComponent,
    TasksComponentComponent,
    TaskDetailsComponent,
    StartProcessComponentComponent,
    SearchComponent,
    DashboardComponentComponent
  ]
})
export class ProcessExtensionModule {
  constructor(extensions: ExtensionService) {
    extensions.setComponents({
      'process.extension.tasks.component': TasksComponentComponent,
      'process.extension.process.start.component': StartProcessComponentComponent,
      'process.extension.process.task.details.component': TaskDetailsComponent,
      'process.extension.customer.search.component': SearchComponent,
      'process.extension.customer.dashboard.component': DashboardComponentComponent
    });
  }
}
