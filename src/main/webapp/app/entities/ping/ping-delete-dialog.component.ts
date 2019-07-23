import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPing } from 'app/shared/model/ping.model';
import { PingService } from './ping.service';

@Component({
  selector: 'jhi-ping-delete-dialog',
  templateUrl: './ping-delete-dialog.component.html'
})
export class PingDeleteDialogComponent {
  ping: IPing;

  constructor(protected pingService: PingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pingListModification',
        content: 'Deleted an ping'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ping-delete-popup',
  template: ''
})
export class PingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ping }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ping = ping;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ping', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ping', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
