import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ping } from 'app/shared/model/ping.model';
import { PingService } from './ping.service';
import { PingComponent } from './ping.component';
import { PingDetailComponent } from './ping-detail.component';
import { PingUpdateComponent } from './ping-update.component';
import { PingDeletePopupComponent } from './ping-delete-dialog.component';
import { IPing } from 'app/shared/model/ping.model';

@Injectable({ providedIn: 'root' })
export class PingResolve implements Resolve<IPing> {
  constructor(private service: PingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPing> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ping>) => response.ok),
        map((ping: HttpResponse<Ping>) => ping.body)
      );
    }
    return of(new Ping());
  }
}

export const pingRoute: Routes = [
  {
    path: '',
    component: PingComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Pings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PingDetailComponent,
    resolve: {
      ping: PingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PingUpdateComponent,
    resolve: {
      ping: PingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PingUpdateComponent,
    resolve: {
      ping: PingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pings'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PingDeletePopupComponent,
    resolve: {
      ping: PingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pings'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
