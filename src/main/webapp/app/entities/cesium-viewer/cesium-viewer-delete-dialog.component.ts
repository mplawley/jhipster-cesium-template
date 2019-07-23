import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICesiumViewer } from 'app/shared/model/cesium-viewer.model';
import { CesiumViewerService } from './cesium-viewer.service';

@Component({
  selector: 'jhi-cesium-viewer-delete-dialog',
  templateUrl: './cesium-viewer-delete-dialog.component.html'
})
export class CesiumViewerDeleteDialogComponent {
  cesiumViewer: ICesiumViewer;

  constructor(
    protected cesiumViewerService: CesiumViewerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cesiumViewerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cesiumViewerListModification',
        content: 'Deleted an cesiumViewer'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-cesium-viewer-delete-popup',
  template: ''
})
export class CesiumViewerDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cesiumViewer }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CesiumViewerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cesiumViewer = cesiumViewer;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/cesium-viewer', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/cesium-viewer', { outlets: { popup: null } }]);
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
