import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICesiumViewer } from 'app/shared/model/cesium-viewer.model';

type EntityResponseType = HttpResponse<ICesiumViewer>;
type EntityArrayResponseType = HttpResponse<ICesiumViewer[]>;

@Injectable({ providedIn: 'root' })
export class CesiumViewerService {
  public resourceUrl = SERVER_API_URL + 'api/cesium-viewers';

  constructor(protected http: HttpClient) {}

  create(cesiumViewer: ICesiumViewer): Observable<EntityResponseType> {
    return this.http.post<ICesiumViewer>(this.resourceUrl, cesiumViewer, { observe: 'response' });
  }

  update(cesiumViewer: ICesiumViewer): Observable<EntityResponseType> {
    return this.http.put<ICesiumViewer>(this.resourceUrl, cesiumViewer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICesiumViewer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICesiumViewer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
