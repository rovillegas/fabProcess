import { Injectable, Input } from '@angular/core';
import { RenditionEntry, RenditionPaging } from '@alfresco/js-api';
import { AlfrescoApiService, LogService } from '@alfresco/adf-core';

@Injectable()
export class RenditionViewerService {
  /** Number of times the Viewer will retry fetching content Rendition.
   * There is a delay of at least one second between attempts.
   */
  @Input()
  maxRetries = 10;

  statusRendition: string = null;

  constructor(
    private logService: LogService,
    private apiService: AlfrescoApiService
  ) {}

  async getRendition(nodeId: string, renditionType: string): Promise<any> {
    try {
      return await this.resolveRendition(nodeId, renditionType);
    } catch (err) {
      this.logService.error(err);
    }
  }

  private async resolveRendition(
    nodeId: string,
    renditionId: string
  ): Promise<any> {
    const supportedRendition: RenditionPaging = await this.apiService.renditionsApi.getRenditions(
      nodeId
    );
    console.log(supportedRendition);

    const rendition: RenditionEntry = supportedRendition.list.entries.find(
      (renditionEntry: RenditionEntry) =>
        renditionEntry.entry.id === renditionId
    );

    let renditionContent;
    if (rendition) {
      const status: string = rendition.entry.status.toString();

      if (status === 'NOT_CREATED') {
        try {
          await this.apiService.renditionsApi
            .createRendition(nodeId, { id: renditionId })
            .then(() => {
              this.statusRendition = 'in_creation';
            });
          renditionContent = await this.waitRendition(nodeId, renditionId);
        } catch (err) {
          this.logService.error(err);
        }
      } else if (status === 'CREATED') {
        renditionContent = await this.apiService.renditionsApi.getRenditionContent(
          nodeId,
          renditionId
        );
      }
    }

    return renditionContent;
  }

  async waitRendition(nodeId: string, renditionId: string): Promise<any> {
    let currentRetry = 0;
    return new Promise<any>((resolve, reject) => {
      const intervalId = setInterval(() => {
        currentRetry++;
        if (this.maxRetries >= currentRetry) {
          this.apiService.renditionsApi.getRendition(nodeId, renditionId).then(
            async (rendition: RenditionEntry) => {
              const status: string = rendition.entry.status.toString();
              if (status === 'CREATED') {
                const renditionContent = await this.apiService.renditionsApi.getRenditionContent(
                  nodeId,
                  renditionId
                );

                clearInterval(intervalId);
                return resolve(renditionContent);
              }
            },
            () => {
              this.statusRendition = 'error_in_creation';
              return reject();
            }
          );
        }
      }, 1000);
    });
  }
}
