import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NotificationService, ViewerComponent } from '@alfresco/adf-core';

@Component({
  selector: 'aca-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @ViewChild(ViewerComponent)
  viewer: ViewerComponent;

  taskId: String;
  fileShowed: any = null;
  previewFileName: string;
  content: any = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ taskId }: Params) => {
      this.taskId = taskId;
    });
  }

  onCompleted(event: any) {
    this.notificationService
      .openSnackMessage('Task Completed', { duration: 3000 });

    this.router.navigate(['process/tasks']);
  }

  onFormContentClick(content: any): void {
    this.fileShowed = true;
    console.log(content);
    this.previewFileName = content.name;
    this.content = content.contentBlob;
  }

  closeViewer(event: any) {
    event.preventDefault();
    this.viewer.close();
    this.fileShowed = false;
    this.previewFileName = "";

  }


}
