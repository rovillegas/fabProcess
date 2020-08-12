import { Injectable } from '@angular/core';
import { AlfrescoApiService, NotificationService } from '@alfresco/adf-core';
import {
  MinimalNodeEntryEntity,
  NodeBodyUpdate,
  NodeEntry
} from '@alfresco/js-api';

@Injectable({
  providedIn: 'root'
})
export class ProcessExtensionService {
  constructor(
    private api: AlfrescoApiService,
    private ns: NotificationService
  ) {}

  onAIApplyDriversLicenseData(payload: MinimalNodeEntryEntity) {
    const body = new NodeBodyUpdate();

    body.aspectNames = [...payload.aspectNames, 'ims:DriversLicense'];

    this.api.nodesApi.updateNode(payload.id, body).then((result: NodeEntry) => {
      console.log('Applied aspect');

      const b = new NodeBodyUpdate();
      b.name = result.entry.name;
      b.properties = { 'ims:Issued': ' ' };

      this.api.nodesApi.updateNode(payload.id, b).then((res: NodeEntry) => {
        this.ns.openSnackMessage('Metadata applied', { duration: 3000 });
      });
    });
  }

  onAIApplyPhaseTwo(payload: MinimalNodeEntryEntity) {
    this.api.renditionsApi
      .getRenditionContent(payload.id, 'aiTextract')
      .then((val: any) => {
        let donorStatus = '';
        let veteranStatus = '';

        if (val.blocks && val.blocks.length > 0) {
          for (const x in val.blocks) {
            if (val.blocks[x]) {
              const block = val.blocks[x];
              if (block.text && block.text.match(/donor/gi)) {
                donorStatus = 'Donor';
              }

              if (block.text && block.text.match(/veteran/gi)) {
                veteranStatus = 'Veteran';
              }
            }
          }

          const body = new NodeBodyUpdate();
          body.properties = {
            'ims:DonorStatus': donorStatus,
            'ims:VeteranStatus': veteranStatus
          };
          this.api.nodesApi
            .updateNode(payload.id, body)
            .then((res: NodeEntry) => {
              this.ns.openSnackMessage('Metadata applied', { duration: 3000 });
            });
        }
      });
  }
}
