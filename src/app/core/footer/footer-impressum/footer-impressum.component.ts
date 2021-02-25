import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-impressum',
  templateUrl: './footer-impressum.component.html',
  styleUrls: ['./footer-impressum.component.css']
})
export class FooterImpressumComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
