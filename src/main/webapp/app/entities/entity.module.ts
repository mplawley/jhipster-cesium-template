import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ping',
        loadChildren: './ping/ping.module#JhipsterCesiumPingModule'
      },
      {
        path: 'cesium-viewer',
        loadChildren: './cesium-viewer/cesium-viewer.module#JhipsterCesiumCesiumViewerModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCesiumEntityModule {}
