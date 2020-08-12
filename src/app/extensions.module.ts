import { NgModule } from '@angular/core';
import { AosExtensionModule } from '@alfresco/adf-office-services-ext';
import { ProcessExtensionModule } from 'process-extension';
import { AiViewModule } from '@alfresco/adf-ai-extension';

// Main entry point for external extensions only.
// For any application-specific code use CoreExtensionsModule instead.

@NgModule({
  imports: [AosExtensionModule, ProcessExtensionModule, AiViewModule]
})
export class AppExtensionsModule { }
