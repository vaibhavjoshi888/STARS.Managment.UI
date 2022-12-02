import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RcentStars } from '../_models/stars';
import { StarManagementService } from '../_services/star-management.service';
declare var $: any;

@Component({
  selector: 'app-noteofthanks',
  templateUrl: './noteofthanks.component.html',
  styleUrls: ['./noteofthanks.component.css']
})
export class NoteofthanksComponent implements OnInit {
  starDetails: RcentStars[] = [];
  InitialLoad: RcentStars[] = [];

  constructor( private starManagementService: StarManagementService) { }

  ngOnInit(): void {

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
     
   
    });

    // $('#nt-example1').newsTicker({
    //   row_height: 180,
    //   max_rows: 4,
    //   duration: 4000,
    //   prevButton: $('#nt-example1-prev'),
    //   nextButton: $('#nt-example1-next')
    // });

    
    $('.share div').each(function (i) {
      loopInfinitely($(this));
    });

    function loopInfinitely(elem) {
      var rand = 1 + Math.floor(Math.random() * 6) * 1000;//max of random 6 seconds
      setTimeout(function () {
        elem.fadeIn(rand).delay(5000).fadeOut(rand);
        loopInfinitely(elem);
      }, rand);
    }
    this.getActiveStars()
  
  }

  getActiveStars() {
    firstValueFrom(this.starManagementService.getStarRecentStar())
      .then((res: any) => {
        this.starDetails = res;
        this.InitialLoad = res;
      }
      )
  }
}
