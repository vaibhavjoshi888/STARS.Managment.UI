import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Stars } from '../_models/stars';
import { StarManagementService } from '../_services/star-management.service';

@Component({
  selector: 'app-viewallstars',
  templateUrl: './viewallstars.component.html',
  styleUrls: ['./viewallstars.component.css']
})
export class ViewallstarsComponent implements OnInit {
  starDetails: Stars[] = [];
  InitialLoad: Stars[] = [];
  constructor(private starManagementService: StarManagementService) { }

   ngOnInit() {
     this.getAllActiveStars();
  }

   getAllActiveStars() {
     firstValueFrom(this.starManagementService.getAllActiveStars())
      .then((res: Stars[]) => {
        this.starDetails = res;
        this.InitialLoad = res;
        console.log(this.starDetails);
      }
      )
  };


}
