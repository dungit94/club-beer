import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'src/app/core/config/application-config.service';
import { getCategoryIdentifier, ICategory } from '../model/category.model';

import { createRequestOption } from "../../core/request/request-util";

export type EntityResponseType = HttpResponse<ICategory>;
export type EntityArrayResponseType = HttpResponse<ICategory[]>;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(category: ICategory): Observable<EntityResponseType> {
    return this.http.post<ICategory>(this.resourceUrl, category, { observe: 'response' });
  }

  update(category: ICategory): Observable<EntityResponseType> {
    return this.http.put<ICategory>(`${this.resourceUrl}/${getCategoryIdentifier(category) as string}`, category, { observe: 'response' });
  }

  partialUpdate(category: ICategory): Observable<EntityResponseType> {
    return this.http.patch<ICategory>(`${this.resourceUrl}/${getCategoryIdentifier(category) as string}`, category, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    console.log(this.resourceUrl);
    return this.http.get<ICategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
