/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterCesiumTestModule } from '../../../test.module';
import { CesiumViewerDetailComponent } from 'app/entities/cesium-viewer/cesium-viewer-detail.component';
import { CesiumViewer } from 'app/shared/model/cesium-viewer.model';

describe('Component Tests', () => {
  describe('CesiumViewer Management Detail Component', () => {
    let comp: CesiumViewerDetailComponent;
    let fixture: ComponentFixture<CesiumViewerDetailComponent>;
    const route = ({ data: of({ cesiumViewer: new CesiumViewer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCesiumTestModule],
        declarations: [CesiumViewerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CesiumViewerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CesiumViewerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cesiumViewer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
