import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aca-tasks-component',
  templateUrl: './tasks-component.component.html',
  styleUrls: ['./tasks-component.component.scss']
})
export class TasksComponentComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToTask(event: any) {
    console.log(event);
    this.router.navigate(['/process/task-details', event]);
  }
}
