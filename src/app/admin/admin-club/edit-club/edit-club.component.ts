import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Club} from '../../../core/models/club';
import {ClubService} from '../../../club/club.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.css']
})
export class EditClubComponent implements OnInit {
  @Input() clubForm: FormGroup;
  @Input() public fishingClub: Club;
  isTestMode = environment.isTestMode;

  constructor(private clubService: ClubService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.isTestMode) {
      Swal.fire('Test Modus', 'Im Testmodus kann nichts bearbeitet werden', 'info').then();
      return;
    }
    this.clubService.updateFishingClub(this.fishingClub.fishingClubId, this.clubForm.value).subscribe(result => {
      if (result) {
        this.toastr.success('Adresse erfolgreich geändert');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
