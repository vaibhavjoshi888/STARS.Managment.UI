import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Stars } from '../_models/stars';
import { MessageService } from '../_services/message.service';
import { StarManagementService } from '../_services/star-management.service';

@Component({
  selector: 'app-viewallstars',
  templateUrl: './viewallstars.component.html',
  styleUrls: ['./viewallstars.component.css']
})
export class ViewallstarsComponent implements OnInit {
  starDetails: Stars[] = [];
  InitialLoad: Stars[] = [];
  isLoginPage: boolean = false;
  searchText: string = "";

  name = 'test';
  links : any[]= ["link1.com", "link2.com", "link3.com"];
  mailText:string = ""; 


  constructor(private starManagementService: StarManagementService,
    private router: Router, private messageservice: MessageService) { }

   ngOnInit() {
     this.getAllActiveStars();
     if (this.router.url == '/viewallstars' && this.messageservice.currentuser == null)
     this.isLoginPage = false;
   else if (this.router.url == '/viewallstarsso' || this.messageservice.currentuser == null)
     this.isLoginPage = false;
   else if (this.router.url == '/viewallstars' && this.messageservice.currentuser != null)
     this.isLoginPage = true;
  }


  isUserLogged() {

    if (!this.messageservice.currentuser == null)
      this.router.navigate(['/submitstar']);
    else
      this.router.navigate(['/login']);
  }

   getAllActiveStars() {
     firstValueFrom(this.starManagementService.getAllActiveStars())
      .then((res: Stars[]) => {
        this.starDetails = res;
        this.InitialLoad = res;
      }
      )
  };
  userIsLogged() {
    return this.isLoginPage;
  }
  getUserList() {
    this.starDetails = this.InitialLoad;
    if (this.searchText != '') {
      this.starDetails = this.starDetails.filter(f => f.employeeName.toLocaleLowerCase().includes(this.searchText) || f.corpUserId.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
    }
    else {
      this.starDetails = this.InitialLoad;
    }
  }

  async updateStarShare(star) {
   await firstValueFrom(this.starManagementService.updateStarShare(star.userStarId,null));
   this.mailText = "mailto:abc@abc.com+?subject=files&body="+this.links.join(" ,"); // add the links to body    
   window.location.href = this.mailText;
  };

  async updateStarLikeCount(userStarId) {
    await firstValueFrom(this.starManagementService.updateStarLikeCount(userStarId,null));
  };

}
