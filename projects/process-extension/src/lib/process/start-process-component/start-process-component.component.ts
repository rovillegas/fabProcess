import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@alfresco/adf-core';


@Component({
  selector: 'aca-start-process-component',
  templateUrl: './start-process-component.component.html',
  styleUrls: ['./start-process-component.component.scss']
})
export class StartProcessComponentComponent implements OnInit {

  constructor(private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onStart(event: any) {
    this.notificationService
      .openSnackMessage('Process Started', { duration: 3000 });
    this.router.navigate(['process/tasks']);
  }

}
