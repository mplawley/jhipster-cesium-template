/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterCesiumTestModule } from '../../../test.module';
import { CesiumViewerComponent } from 'app/entities/cesium-viewer/cesium-viewer.component';
import { CesiumViewerService } from 'app/entities/cesium-viewer/cesium-viewer.service';
import { CesiumViewer } from 'app/shared/model/cesium-viewer.model';

describe('Component Tests', () => {
  describe('CesiumViewer Management Component', () => {
    let comp: CesiumViewerComponent;
    let fixture: ComponentFixture<CesiumViewerComponent>;
    let service: CesiumViewerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCesiumTestModule],
        declarations: [CesiumViewerComponent],
        providers: []
      })
        .overrideTemplate(CesiumViewerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CesiumViewerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CesiumViewerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CesiumViewer(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cesiumViewers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
