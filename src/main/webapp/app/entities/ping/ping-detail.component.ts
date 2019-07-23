import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPing } from 'app/shared/model/ping.model';

@Component({
  selector: 'jhi-ping-detail',
  templateUrl: './ping-detail.component.html'
})
export class PingDetailComponent implements OnInit {
  ping: IPing;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ping }) => {
      this.ping = ping;
    });
  }

  previousState() {
    window.history.back();
  }
}
