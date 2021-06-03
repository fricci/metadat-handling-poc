import { Injectable } from '@angular/core';
import { TEST_DATA } from './testdata';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  getMetadataById(id: string): Promise<any> {
    return Promise.resolve(TEST_DATA[id]);
  }
}
