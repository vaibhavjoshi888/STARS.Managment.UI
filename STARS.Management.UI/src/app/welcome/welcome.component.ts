import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, throwError } from 'rxjs';
import { RcentStars } from '../_models/stars';
import { StarRequestCountDTO } from '../_models/user';
import { MessageService } from '../_services/message.service';
import { StarManagementService } from '../_services/star-management.service';

declare var $: any;

//declare var jQuery: any;
//import * as $ from 'jquery';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isLoginPage: boolean = false;
  ntExample1: any;
  requestCount: StarRequestCountDTO;
  starDetails: RcentStars[] = [];
  InitialLoad: RcentStars[] = [];
  totalStarAdded :any;
  name: string = "";


  constructor(private router: Router, private messageservice: MessageService,
    private starManagementService: StarManagementService,) {

  }

  ngOnInit(): void {
    this.messageservice.currentuser == null;

    if (this.router.url == '/welcome' || this.messageservice.currentuser == null)
      this.isLoginPage = false;
    else if (this.router.url == '/welcomesignout' || this.messageservice.currentuser == null)
      this.isLoginPage = false;
    else if (this.router.url == '/welcome' || this.messageservice.currentuser != null)
      this.isLoginPage = true;
    else if (this.router.url == '/')
      this.isLoginPage = true;
    else if (this.router.url == '/welcomesignin')
      this.isLoginPage = true;



    $(document).ready(() => {

      var maxLength = 120;
      $(".show-more").each(function () {
        var myStr = $(this).text();
        if ($.trim(myStr).length > maxLength) {
          var newStr = myStr.substring(0, maxLength);
          var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
          $(this).empty().html(newStr);
          $(this).append(' <a href="javascript:void(0);" class="read-more">...more> </a>');
          $(this).append('<span class="more-text">' + removedStr + '</span>');
        }
      });
      $(".read-more").click(function () {
        $(this).siblings(".more-text").contents().unwrap();
        $(this).remove();
      });

      $('#nt-example1').newsTicker({
        row_height: 180,
        max_rows: 4,
        duration: 4000,
        prevButton: $('#nt-example1-prev'),
        nextButton: $('#nt-example1-next')
      });


    });




    $('.share div').each(function (i) {
      loopInfinitely($(this));
    });

    function loopInfinitely(elem) {
      var rand = 1 + Math.floor(Math.random() * 10) * 1000;//max of random 6 seconds
      setTimeout(function () {
        elem.fadeIn(rand).delay(10000).fadeOut(rand);
        loopInfinitely(elem);
      }, rand);
    }

     this.getActiveStars()
     this.getStarRequestCount()

  }

   getStarRequestCount() {
     firstValueFrom(this.starManagementService.getStarRequestCount())
      .then((res: StarRequestCountDTO) => {
        this.requestCount = res;
      })
  }

  getActiveStars() {
    firstValueFrom(this.starManagementService.getStarRecentStar())
      .then((res: any) => {
        this.starDetails = res;
        this.InitialLoad = res;
      }
      )
  }

  findStar(val){
    this.router.navigate(
      ['/viewallstars'],
      { queryParams: { name: val } }
    );

  }

  login() {
    this.router.navigate(['/login']);
  }
  isUserLogged() {

    if (!this.messageservice.currentuser == null)
      this.router.navigate(['/submitstar']);
    else
      this.router.navigate(['/login']);
  }
  userIsLogged() {
    return this.isLoginPage;
  }

}
