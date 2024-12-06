import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import {ListPageModule} from "../../operation/list/list.module";
import {HomePageModule} from "../../home/home.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    ListPageModule,
    HomePageModule
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
