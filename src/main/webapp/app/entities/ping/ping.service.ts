import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPing } from 'app/shared/model/ping.model';

type EntityResponseType = HttpResponse<IPing>;
type EntityArrayResponseType = HttpResponse<IPing[]>;

@Injectable({ providedIn: 'root' })
export class PingService {
  public resourceUrl = SERVER_API_URL + 'api/pings';

  constructor(protected http: HttpClient) {}

  create(ping: IPing): Observable<EntityResponseType> {
    return this.http.post<IPing>(this.resourceUrl, ping, { observe: 'response' });
  }

  update(ping: IPing): Observable<EntityResponseType> {
    return this.http.put<IPing>(this.resourceUrl, ping, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPing>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPing[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
