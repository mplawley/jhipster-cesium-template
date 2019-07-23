/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterCesiumTestModule } from '../../../test.module';
import { CesiumViewerDeleteDialogComponent } from 'app/entities/cesium-viewer/cesium-viewer-delete-dialog.component';
import { CesiumViewerService } from 'app/entities/cesium-viewer/cesium-viewer.service';

describe('Component Tests', () => {
  describe('CesiumViewer Management Delete Component', () => {
    let comp: CesiumViewerDeleteDialogComponent;
    let fixture: ComponentFixture<CesiumViewerDeleteDialogComponent>;
    let service: CesiumViewerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCesiumTestModule],
        declarations: [CesiumViewerDeleteDialogComponent]
      })
        .overrideTemplate(CesiumViewerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CesiumViewerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CesiumViewerService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
