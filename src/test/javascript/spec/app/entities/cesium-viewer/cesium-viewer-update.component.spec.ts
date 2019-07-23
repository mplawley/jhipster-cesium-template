/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterCesiumTestModule } from '../../../test.module';
import { CesiumViewerUpdateComponent } from 'app/entities/cesium-viewer/cesium-viewer-update.component';
import { CesiumViewerService } from 'app/entities/cesium-viewer/cesium-viewer.service';
import { CesiumViewer } from 'app/shared/model/cesium-viewer.model';

describe('Component Tests', () => {
  describe('CesiumViewer Management Update Component', () => {
    let comp: CesiumViewerUpdateComponent;
    let fixture: ComponentFixture<CesiumViewerUpdateComponent>;
    let service: CesiumViewerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCesiumTestModule],
        declarations: [CesiumViewerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CesiumViewerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CesiumViewerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CesiumViewerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CesiumViewer(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CesiumViewer();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
