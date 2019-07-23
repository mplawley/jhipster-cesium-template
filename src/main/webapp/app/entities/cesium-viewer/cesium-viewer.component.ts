import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICesiumViewer } from 'app/shared/model/cesium-viewer.model';
import { AccountService } from 'app/core';
import { CesiumViewerService } from './cesium-viewer.service';

@Component({
  selector: 'jhi-cesium-viewer',
  templateUrl: './cesium-viewer.component.html'
})
export class CesiumViewerComponent implements OnInit, OnDestroy {
  cesiumViewers: ICesiumViewer[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cesiumViewerService: CesiumViewerService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cesiumViewerService
      .query()
      .pipe(
        filter((res: HttpResponse<ICesiumViewer[]>) => res.ok),
        map((res: HttpResponse<ICesiumViewer[]>) => res.body)
      )
      .subscribe(
        (res: ICesiumViewer[]) => {
          this.cesiumViewers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCesiumViewers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICesiumViewer) {
    return item.id;
  }

  registerChangeInCesiumViewers() {
    this.eventSubscriber = this.eventManager.subscribe('cesiumViewerListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
