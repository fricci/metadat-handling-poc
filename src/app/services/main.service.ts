import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TEST_DATA } from './testdata';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  getMetadataById(id: string): Observable<any> {
    return of(TEST_DATA[id]);
  }
}
