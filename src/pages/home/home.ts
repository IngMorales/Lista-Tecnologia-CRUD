import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   public items : Array<any> = [];
   constructor(public navCtrl: NavController,
               public http   : HttpClient)
   {

   }

   ionViewWillEnter() : void
   {
      this.load();
   }

   load() : void
   {
      this.http
      .get('https://ionic.asesoriaseducate.com/retrieve-data.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   addEntry() : void
   {
      this.navCtrl.push('AddTechnologyPage');
   }

   viewEntry(param : any) : void
   {
      this.navCtrl.push('AddTechnologyPage', param);
   }


}
