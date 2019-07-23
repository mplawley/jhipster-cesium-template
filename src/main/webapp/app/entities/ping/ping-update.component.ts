import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPing, Ping } from 'app/shared/model/ping.model';
import { PingService } from './ping.service';

@Component({
  selector: 'jhi-ping-update',
  templateUrl: './ping-update.component.html'
})
export class PingUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    label: [],
    latitude: [],
    longitude: []
  });

  constructor(protected pingService: PingService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ping }) => {
      this.updateForm(ping);
    });
  }

  updateForm(ping: IPing) {
    this.editForm.patchValue({
      id: ping.id,
      label: ping.label,
      latitude: ping.latitude,
      longitude: ping.longitude
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ping = this.createFromForm();
    if (ping.id !== undefined) {
      this.subscribeToSaveResponse(this.pingService.update(ping));
    } else {
      this.subscribeToSaveResponse(this.pingService.create(ping));
    }
  }

  private createFromForm(): IPing {
    return {
      ...new Ping(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      latitude: this.editForm.get(['latitude']).value,
      longitude: this.editForm.get(['longitude']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPing>>) {
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
