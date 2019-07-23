import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICesiumViewer } from 'app/shared/model/cesium-viewer.model';

@Component({
  selector: 'jhi-cesium-viewer-detail',
  templateUrl: './cesium-viewer-detail.component.html'
})
export class CesiumViewerDetailComponent implements OnInit {
  cesiumViewer: ICesiumViewer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cesiumViewer }) => {
      this.cesiumViewer = cesiumViewer;
    });
  }

  previousState() {
    window.history.back();
  }
}
