import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Stars } from '../_models/stars';
import { MessageService } from '../_services/message.service';
import { StarManagementService } from '../_services/star-management.service';
// import 'rxjs/add/operator/filter';

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
  title: string = "South Brooklyn Health Stars";
  dt1:any;
  dt2:any;
  fromdate: string= "";
  todate:string="";

  name = 'test';
  links: any[] = ["link1.com", "link2.com", "link3.com"];
  mailText: string = "";

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private starManagementService: StarManagementService,
    private router: Router, private messageservice: MessageService,
    private route: ActivatedRoute,private datePipe: DatePipe) {
      this.dt1 = new Date();
      this.dt1.setDate(this.dt1.getDate()-7);
      this.dt2 = new Date();
      //MM-dd-yyyy
     }

  async  ngOnInit() {
    
   
    if (this.router.url == '/viewallstars' && this.messageservice.currentuser == null) {
      this.isLoginPage = false;
    }
    else if (this.router.url == '/viewallstarsso' || this.messageservice.currentuser == null) {
      this.isLoginPage = false;
    }
    else if (this.router.url.includes('/viewallstars') && this.messageservice.currentuser != null) {
      this.isLoginPage = true;
    }

  
    this.route.queryParams
    .subscribe(params => {
     console.log(params); // { order: "popular" }

     if(params){

    this.name = params['name'];
    if(this.name)
    this.title="Stars for "+this.name;
     }
    this.getAllActiveStars();
   
    
    // this.starDetails = this.starDetails.filter(f => f.employeeName.toLocaleLowerCase().includes(this.name));
    // console.log(this.order); // popular
   
});
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
        if(this.name)
        {
          this.starDetails = res.filter(f => f.employeeName.toLocaleLowerCase().includes(this.name));
        }

        this.name = undefined;
        this.getUserListByDate();
  
      }
      )
  };

  userIsLogged() {
    return this.isLoginPage;
  }

  getUserList() {
    this.starDetails = this.InitialLoad;
    if (this.searchText != '') {
      this.starDetails = this.starDetails.filter(f => f.employeeName.toLocaleLowerCase().includes(this.searchText) 
      || f.corpUserId.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
    }
    else {
      this.starDetails = this.InitialLoad;
    }
  }

  getUserListByDate() {
    this.starDetails = this.InitialLoad;
    if (this.dt1 != '') {
      this.starDetails = this.starDetails
        .filter(m => new Date(m.createdDate) >= new Date(this.datePipe.transform(this.dt1,"MM/dd/yyyy")) && new Date(m.createdDate) <= new Date(this.datePipe.transform(this.dt2,"MM/dd/yyyy")));
    }

    // let.selectedMembers = this.members.filter(
    //   m => new Date(m.date) >= new Date(startDate) && new Date(m.date) <= new Date(endDate)
    //   );
    else {
      this.starDetails = this.InitialLoad;
    }
  }

  async updateStarShare(star) {
    await firstValueFrom(this.starManagementService.updateStarShare(star.userStarId, null));
    this.mailText = "mailto:abc@abc.com+?subject=files&body=" + this.links.join(" ,"); // add the links to body    
    window.location.href = this.mailText;
    window.location.reload();

  };

  async updateStarLikeCount(userStarId) {
    await firstValueFrom(this.starManagementService.updateStarLikeCount(userStarId, null));
    window.location.reload();
  };

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllActiveStars();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllActiveStars();
  }
}
