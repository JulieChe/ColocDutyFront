import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.component.html',
  styleUrls: ['./exploration.component.css']
})
export class ExplorationComponent implements OnInit {
  [x: string]: any;

  constructor() { }


coloc;

  ngOnInit(): void {


this.http.get('http://localhost:8085/coloc').subscribe({

next:(data) => {this.coloc=data},
error:(err) =>{console.log(err)}

}



);

}


  }


