import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { JhipsterCesiumAppModule } from './app.module';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

// window['CESIUM_BASE_URL'] = '/assets/cesium'; // If youre using Cesium version < 1.42.0 add this line
// Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/'); // If youre using Cesium version >= 1.42.0 add this line

platformBrowserDynamic()
  .bootstrapModule(JhipsterCesiumAppModule, { preserveWhitespaces: true })
  .then(success => console.log(`Application started`))
  .catch(err => console.error(err));
