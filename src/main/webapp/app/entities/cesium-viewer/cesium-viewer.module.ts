import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterCesiumSharedModule } from 'app/shared';
import {
  CesiumViewerComponent,
  CesiumViewerDetailComponent,
  CesiumViewerUpdateComponent,
  CesiumViewerDeletePopupComponent,
  CesiumViewerDeleteDialogComponent,
  cesiumViewerRoute,
  cesiumViewerPopupRoute
} from './';

const ENTITY_STATES = [...cesiumViewerRoute, ...cesiumViewerPopupRoute];

@NgModule({
  imports: [JhipsterCesiumSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CesiumViewerComponent,
    CesiumViewerDetailComponent,
    CesiumViewerUpdateComponent,
    CesiumViewerDeleteDialogComponent,
    CesiumViewerDeletePopupComponent
  ],
  entryComponents: [
    CesiumViewerComponent,
    CesiumViewerUpdateComponent,
    CesiumViewerDeleteDialogComponent,
    CesiumViewerDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCesiumCesiumViewerModule {}
