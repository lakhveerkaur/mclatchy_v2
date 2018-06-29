import { Component, OnInit } from '@angular/core';
import { newslist } from '../newslist';
import { NewsStatusService } from '../news-status.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-verified-list',
  templateUrl: './verified-list.component.html',
  styleUrls: ['./verified-list.component.css']
})
export class VerifiedListComponent implements OnInit {
  newslist:any[] ;
  result;
  status;
  one;
  constructor(private newsStatusService:NewsStatusService,private http: HttpClient) {

      this.one = new newslist();
   }

  ngOnInit() {
    console.log('status--',this.status)
    this.http.get("/getStatus")
      .subscribe(response => {
        this.result = response;
        console.log(this.result=='',"result");
        if(this.result == '')
        this.doChange();
        else
        this.status = this.result[this.result.length-1].status;
        this.getData(this.status);
      });
  }
  doChange(){
    // let stories = new newslist().getData();
    // console.log(stories);
    console.log("doChnage called");
    this.one.getStories();
  }
  getData(val){
    console.log("function called");
          let altered = new newslist().newslist.map((item, i) => {
            if(item.Story_id == "ST001"){
              item["Assigned_to"] = "Jonathan";
              item["Status"] = "Verified";
              item["Result"] = val;
            }
            return item;
          });

          this.newslist = altered.filter(opt => opt.Status=='Verified');
    }
    onApprove(data){
   console.log(data,"response");
   this.newslist = this.newslist
             .filter(opt => !opt.checked);

   alert("Selected news are approved");

 }
}
