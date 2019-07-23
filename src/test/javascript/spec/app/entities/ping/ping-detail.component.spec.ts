/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterCesiumTestModule } from '../../../test.module';
import { PingDetailComponent } from 'app/entities/ping/ping-detail.component';
import { Ping } from 'app/shared/model/ping.model';

describe('Component Tests', () => {
  describe('Ping Management Detail Component', () => {
    let comp: PingDetailComponent;
    let fixture: ComponentFixture<PingDetailComponent>;
    const route = ({ data: of({ ping: new Ping(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCesiumTestModule],
        declarations: [PingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ping).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
