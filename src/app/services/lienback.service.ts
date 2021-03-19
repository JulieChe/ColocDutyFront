import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LienbackService {

  constructor() { }

  lienback = 'http://localhost:8085/';

  lien = 'http://localhost:8085/';

}
