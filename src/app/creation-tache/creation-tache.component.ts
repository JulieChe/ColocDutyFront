import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creation-tache',
  templateUrl: './creation-tache.component.html',
  styleUrls: ['./creation-tache.component.css']
})
export class CreationTacheComponent implements OnInit {

  constructor(private http: HttpClient) { }

  tache;

  ngOnInit(): void {
  }

  tacheCreate(tache): void {
    this.http.post('http://localhost:8085/savetache', tache).subscribe({
      next: (data) => {
        this.tache = data;
        console.log(this.tache);
        console.log(this.tache.ponctuel.checked);
      },
    });
  }

}


