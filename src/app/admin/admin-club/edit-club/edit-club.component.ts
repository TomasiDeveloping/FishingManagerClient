import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Club} from '../../../core/models/club';
import {ClubService} from '../../../club/club.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.css']
})
export class EditClubComponent implements OnInit {
  @Input() clubForm: FormGroup;
  @Input() public fishingClub: Club;

  constructor(private clubService: ClubService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.clubService.updateFishingClub(this.fishingClub.fishingClubId, this.clubForm.value).subscribe(result => {
      if (result) {
        this.toastr.success('Adresse erfolgreich geändert');
      }
    }, error => {
      this.toastr.error(error.error);
    });
  }
}
