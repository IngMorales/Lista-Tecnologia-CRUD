import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTechnologyPage } from './add-technology';

@NgModule({
  declarations: [
    AddTechnologyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTechnologyPage),
  ],
})
export class AddTechnologyPageModule {}
