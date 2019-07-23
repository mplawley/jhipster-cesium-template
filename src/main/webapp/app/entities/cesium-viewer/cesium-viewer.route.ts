import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CesiumViewer } from 'app/shared/model/cesium-viewer.model';
import { CesiumViewerService } from './cesium-viewer.service';
import { CesiumViewerComponent } from './cesium-viewer.component';
import { CesiumViewerDetailComponent } from './cesium-viewer-detail.component';
import { CesiumViewerUpdateComponent } from './cesium-viewer-update.component';
import { CesiumViewerDeletePopupComponent } from './cesium-viewer-delete-dialog.component';
import { ICesiumViewer } from 'app/shared/model/cesium-viewer.model';

@Injectable({ providedIn: 'root' })
export class CesiumViewerResolve implements Resolve<ICesiumViewer> {
  constructor(private service: CesiumViewerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICesiumViewer> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CesiumViewer>) => response.ok),
        map((cesiumViewer: HttpResponse<CesiumViewer>) => cesiumViewer.body)
      );
    }
    return of(new CesiumViewer());
  }
}

export const cesiumViewerRoute: Routes = [
  {
    path: '',
    component: CesiumViewerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CesiumViewers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CesiumViewerDetailComponent,
    resolve: {
      cesiumViewer: CesiumViewerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CesiumViewers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CesiumViewerUpdateComponent,
    resolve: {
      cesiumViewer: CesiumViewerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CesiumViewers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CesiumViewerUpdateComponent,
    resolve: {
      cesiumViewer: CesiumViewerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CesiumViewers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cesiumViewerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CesiumViewerDeletePopupComponent,
    resolve: {
      cesiumViewer: CesiumViewerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CesiumViewers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
