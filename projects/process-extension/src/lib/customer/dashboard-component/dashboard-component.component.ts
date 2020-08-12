import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ObjectDataTableAdapter, AlfrescoApiService } from '@alfresco/adf-core';
import {
  SearchRequest,
  ResultSetPaging,
  NodePaging,
  NodeEntry
} from '@alfresco/js-api';
import { NodeEntityEvent } from '@alfresco/adf-content-services';

@Component({
  selector: 'aca-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.scss']
})
export class DashboardComponentComponent implements OnInit {
  nodeId: string = '';
  tasks: ObjectDataTableAdapter;
  recentDocuments: NodePaging;
  customerId: string = '';
  customerName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: AlfrescoApiService
  ) {
    this.tasks = new ObjectDataTableAdapter(
      [
        { task: 'Review Medical Report', deadline: 'Tomorrow' },
        { task: 'Review Claims Adjuster Report', deadline: 'May 16' },
        { task: 'Review AI extracted metadata', deadline: 'May 19' }
      ],
      // schema
      [
        {
          type: 'text',
          key: 'task',
          title: 'Task',
          cssClass: 'full-width'
        },
        {
          type: 'text',
          key: 'deadline',
          title: 'Deadline',
          sortable: true
        }
      ]
    );
  }

  ngOnInit() {
    this.route.params.subscribe(({ node }: Params) => {
      this.nodeId = node;

      this.api
        .getInstance()
        .core.nodesApi.getNode(this.nodeId)
        .then((n: NodeEntry) => {
          this.customerId = n.entry.properties['ims:InsurantID'];
          this.customerName =
            n.entry.properties['ims:FirstName'] +
            ' ' +
            n.entry.properties['ims:LastName'];

          let q =
            'TYPE:{http://www.alfresco.com/model/insurance/1.0}InsuranceDocument';
          q += " AND ims:InsurantID:'" + this.customerId + "'";

          const sq = new SearchRequest({
            query: {
              query: q
            },
            include: ['aspectNames', 'properties'],
            paging: {
              maxItems: 3,
              skipCount: 0
            }
          });

          this.api
            .getInstance()
            .search.searchApi.search(sq)
            .then((value: ResultSetPaging) => {
              if (value.list.entries.length > 0) {
                this.recentDocuments = value;
              }
            });
        });
    });
  }

  preview(event: NodeEntityEvent) {
    console.log(event);
    const parent = event.value.entry.parentId;
    const node = event.value.entry.id;

    this.router.navigate(['/libraries', parent, 'preview', node]);
  }
}
