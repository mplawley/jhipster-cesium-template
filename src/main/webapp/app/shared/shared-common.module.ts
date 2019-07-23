import { NgModule } from '@angular/core';

import { JhipsterCesiumSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [JhipsterCesiumSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [JhipsterCesiumSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterCesiumSharedCommonModule {}
