import { Component, OnInit } from '@angular/core';
import { SearchRequest, ResultSetPaging } from '@alfresco/js-api';
import { AlfrescoApiService, NotificationService } from '@alfresco/adf-core';
import { Router } from '@angular/router';

@Component({
  selector: 'aca-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  account: String = '';

  constructor(
    private api: AlfrescoApiService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSearch() {
    console.log(this.account);
    let q =
      "PATH:'/app:company_home/st:sites/cm:credit/cm:documentLibrary/*' AND +TYPE:'cm:folder' AND +ASPECT:'cm:titled'";

    if (this.account.length > 0) {
      q += " AND cm:name:'" + this.account + "'";
    }
    const sq = new SearchRequest({
      query: {
        query: q
      },
      include: ['aspectNames', 'properties']
    });

    this.api
      .getInstance()
      .search.searchApi.search(sq)
      .then((value: ResultSetPaging) => {
        if (value.list.entries.length > 0) {
          const nodeId = value.list.entries[0].entry.id;
          this.router.navigate(['customer/', nodeId, 'dashboard']);
        } else {
          this.notificationService.openSnackMessage('Account not found', {
            duration: 3000
          });
        }
      });
  }
}
