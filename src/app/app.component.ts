import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'colocDuty';
  idUser = 0;
  visible;

  constructor() { }

  ngOnInit(): void {

  }

  cacherAff(idUser):boolean{
    if(localStorage.getItem('user') != null){
      this.visible = true;
    }
    else {
      this.visible = false;
    }
    return this.visible
  }



}
