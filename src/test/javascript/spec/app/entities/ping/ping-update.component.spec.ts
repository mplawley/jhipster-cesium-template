/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterCesiumTestModule } from '../../../test.module';
import { PingUpdateComponent } from 'app/entities/ping/ping-update.component';
import { PingService } from 'app/entities/ping/ping.service';
import { Ping } from 'app/shared/model/ping.model';

describe('Component Tests', () => {
  describe('Ping Management Update Component', () => {
    let comp: PingUpdateComponent;
    let fixture: ComponentFixture<PingUpdateComponent>;
    let service: PingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCesiumTestModule],
        declarations: [PingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ping(123);
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
        const entity = new Ping();
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
