import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColocService } from '../services/coloc.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})
export class ExplorationComponent implements OnInit {
  [x: string]: any;

  constructor(private http: HttpClient, private coloc: ColocService, private router: Router ) { }


colocation;

elements: any = [];
headElements = ['id', 'first', 'last', 'handle'];

  ngOnInit(): void {
this.http.get('http://localhost:8085/coloc').subscribe({
next:(data) => {console.log('Données importées de la BD');
  this.colocation=data},
error:(err) =>{console.log(err)}
});

for (let i = 1; i <= 15; i++) {
  this.elements.push({ id: i, first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i });
}
}

redirection(idColoc): void{

console.log(idColoc);
this.coloc.scoloc=idColoc;
this.router.navigateByUrl('public-coloc');


}


}
