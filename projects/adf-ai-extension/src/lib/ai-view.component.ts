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

import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Node } from '@alfresco/js-api';
import { DrawService } from './draw.service';
import { RenditionViewerService } from './rendition-viewer.service';

@Component({
  selector: 'adf-ai-viewer',
  templateUrl: './ai-view.component.html',
  styleUrls: ['./ai-view.component.css'],
  host: { class: 'adf-image-viewer' },
  encapsulation: ViewEncapsulation.None
})
export class AiViewComponent implements OnInit, OnChanges, OnDestroy {
  showToolbar = true;

  @Input()
  url: string;

  @Input()
  node: Node;

  confidence = 90;
  renditionFileContent: any = null;
  selectedEngine: string;
  loading = false;

  rotate = 0;
  scaleX = 1.0;
  scaleY = 1.0;
  offsetX = 0;
  offsetY = 0;
  isDragged = false;

  private drag = { x: 0, y: 0 };
  private delta = { x: 0, y: 0 };

  get transform(): string {
    return `scale(${this.scaleX}, ${this.scaleY}) rotate(${
      this.rotate
    }deg) translate(${this.offsetX}px, ${this.offsetY}px)`;
  }

  get currentScaleText(): string {
    return Math.round(this.scaleX * 100) + '%';
  }

  private element: HTMLElement;

  constructor(
    private drawService: DrawService,
    private renditionViewerService: RenditionViewerService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.element = <HTMLElement>(
      this.el.nativeElement.querySelector('#viewer-image')
    );

    if (this.element) {
      this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.element.addEventListener('mouseup', this.onMouseUp.bind(this));
      this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
      this.element.addEventListener('mouseout', this.onMouseOut.bind(this));
      this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.element) {
      this.element.removeEventListener('mousedown', this.onMouseDown);
      this.element.removeEventListener('mouseup', this.onMouseUp);
      this.element.removeEventListener('mouseleave', this.onMouseLeave);
      this.element.removeEventListener('mouseout', this.onMouseOut);
      this.element.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragged = true;
    this.drag = { x: event.pageX, y: event.pageY };
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragged) {
      event.preventDefault();

      this.delta.x = event.pageX - this.drag.x;
      this.delta.y = event.pageY - this.drag.y;

      this.drag.x = event.pageX;
      this.drag.y = event.pageY;

      const scaleX = this.scaleX !== 0 ? this.scaleX : 1.0;
      const scaleY = this.scaleY !== 0 ? this.scaleY : 1.0;

      this.offsetX += this.delta.x / scaleX;
      this.offsetY += this.delta.y / scaleY;
    }
  }

  onMouseUp(event: MouseEvent) {
    if (this.isDragged) {
      event.preventDefault();
      this.isDragged = false;
    }
  }

  onMouseLeave(event: MouseEvent) {
    if (this.isDragged) {
      event.preventDefault();
      this.isDragged = false;
    }
  }

  onMouseOut(event: MouseEvent) {
    if (this.isDragged) {
      event.preventDefault();
      this.isDragged = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.url) {
      throw new Error('Attribute urlFile is required');
    }

    if (this.renditionFileContent) {
      console.log(' this.renditionFileContent' + this.renditionFileContent);
    }
  }

  private getCanvasDimensions() {
    const elementImage: any = document.getElementById('adf-ai-viewer-image');
    const width = elementImage.width;
    const height = elementImage.height;
    return { width, height };
  }

  aiTextractClick() {
    this.selectedEngine = 'aiTextract';
    this.aiLoad();
  }

  aiRekognitionClick() {
    this.selectedEngine = 'aiLabels';
    this.aiLoad();
  }

  aiLoad() {
    const { width, height } = this.getCanvasDimensions();

    if (this.selectedEngine === 'aiTextract') {
      this.aiTextractExecutor(width, height, 'aiTextract');
    } else if (this.selectedEngine === 'aiLabels') {
      this.aiRekognitionExecutor(width, height, 'aiLabels');
    }
  }

  async aiTextractExecutor(width: any, height: any, renditionType: string) {
    this.loading = true;
    const parentElement: any = document.getElementById(
      'adf-ai-image-boxes-wrapper'
    );
    parentElement.innerHTML = '';
    this.renditionFileContent = await this.renditionViewerService.getRendition(
      this.node.id,
      renditionType
    );

    this.loading = false;

    if (this.renditionFileContent.blocks) {
      this.renditionFileContent.blocks.forEach((currentRectangle: any) => {
        const containsChild =
          currentRectangle.relationships &&
          currentRectangle.relationships.length > 0 &&
          currentRectangle.relationships[0].type === 'CHILD';
        if (
          currentRectangle.confidence >= this.confidence &&
          containsChild &&
          currentRectangle.text
        ) {
          this.drawService.drawPolygon(
            currentRectangle.geometry.boundingBox,
            width,
            height,
            parentElement,
            currentRectangle.text
          );
        }
      });
    }
  }

  async aiRekognitionExecutor(width: any, height: any, renditionType: string) {
    this.loading = true;

    const parentElement: any = document.getElementById(
      'adf-ai-image-boxes-wrapper'
    );
    parentElement.innerHTML = '';

    this.renditionFileContent = await this.renditionViewerService.getRendition(
      this.node.id,
      renditionType
    );

    this.loading = false;

    this.renditionFileContent.originalResponse.labels.forEach(
      (currentRectangle: any) => {
        if (
          currentRectangle.instances &&
          currentRectangle.instances.length > 0
        ) {
          currentRectangle.instances.forEach((currentInstance: any) => {
            if (currentInstance.confidence >= this.confidence) {
              this.drawService.drawPolygon(
                currentInstance.boundingBox,
                width,
                height,
                parentElement,
                currentRectangle.name
              );
            }
          });
        }
      }
    );
  }

  zoomIn() {
    const ratio = +(this.scaleX + 0.2).toFixed(1);
    this.scaleX = this.scaleY = ratio;
  }

  zoomOut() {
    let ratio = +(this.scaleX - 0.2).toFixed(1);
    if (ratio < 0.2) {
      ratio = 0.2;
    }
    this.scaleX = this.scaleY = ratio;
  }

  rotateLeft() {
    const angle = this.rotate - 90;
    this.rotate = Math.abs(angle) < 360 ? angle : 0;
  }

  rotateRight() {
    const angle = this.rotate + 90;
    this.rotate = Math.abs(angle) < 360 ? angle : 0;
  }

  reset() {
    this.rotate = 0;
    this.scaleX = 1.0;
    this.scaleY = 1.0;
    this.offsetX = 0;
    this.offsetY = 0;
  }
}
