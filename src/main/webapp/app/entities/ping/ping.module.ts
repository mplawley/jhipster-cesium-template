import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterCesiumSharedModule } from 'app/shared';
import {
  PingComponent,
  PingDetailComponent,
  PingUpdateComponent,
  PingDeletePopupComponent,
  PingDeleteDialogComponent,
  pingRoute,
  pingPopupRoute
} from './';

const ENTITY_STATES = [...pingRoute, ...pingPopupRoute];

@NgModule({
  imports: [JhipsterCesiumSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PingComponent, PingDetailComponent, PingUpdateComponent, PingDeleteDialogComponent, PingDeletePopupComponent],
  entryComponents: [PingComponent, PingUpdateComponent, PingDeleteDialogComponent, PingDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCesiumPingModule {}
