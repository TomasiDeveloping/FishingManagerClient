import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FooterContactComponent} from './footer-contact/footer-contact.component';
import {FooterImpressumComponent} from './footer-impressum/footer-impressum.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  onContact(): void {
    this.dialog.open(FooterContactComponent, {
      width: '80%',
      height: 'auto'
    });
  }

  onImpressum(): void {
    this.dialog.open(FooterImpressumComponent, {
      width: '90%',
      height: 'auto'
    });
  }
}
