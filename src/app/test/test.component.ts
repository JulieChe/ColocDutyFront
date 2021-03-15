import { Component, OnInit } from '@angular/core';
import { AutheService } from '../services/authe.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private authe: AutheService) { }

  ngOnInit(): void {
    console.log('user connect ', this.authe.getUserCo());
  }

  deco(): any {
    this.authe.deconnectUser();
  }

}
