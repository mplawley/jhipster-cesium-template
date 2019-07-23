import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICesiumViewer, CesiumViewer } from 'app/shared/model/cesium-viewer.model';
import { CesiumViewerService } from './cesium-viewer.service';

@Component({
  selector: 'jhi-cesium-viewer-update',
  templateUrl: './cesium-viewer-update.component.html'
})
export class CesiumViewerUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected cesiumViewerService: CesiumViewerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cesiumViewer }) => {
      this.updateForm(cesiumViewer);
    });
  }

  updateForm(cesiumViewer: ICesiumViewer) {
    this.editForm.patchValue({
      id: cesiumViewer.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cesiumViewer = this.createFromForm();
    if (cesiumViewer.id !== undefined) {
      this.subscribeToSaveResponse(this.cesiumViewerService.update(cesiumViewer));
    } else {
      this.subscribeToSaveResponse(this.cesiumViewerService.create(cesiumViewer));
    }
  }

  private createFromForm(): ICesiumViewer {
    return {
      ...new CesiumViewer(),
      id: this.editForm.get(['id']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICesiumViewer>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
