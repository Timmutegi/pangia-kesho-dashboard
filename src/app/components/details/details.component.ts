import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  ID: string;
  policyHolder: any;
  isLoading = true;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.params.ID;
    this.api.get('/PolicyHolders/' + this.ID).subscribe(
      res => {
        console.log(res);
        this.policyHolder = res;
        this.isLoading = false;
      }
    );

  }

}
