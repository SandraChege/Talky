import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PostformComponent } from './postform/postform.component';
import { MypostsComponent } from './myposts/myposts.component';
import { SummaryComponent } from './summary/summary.component';
import { PeopleComponent } from './people/people.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SearchPipe } from './pipes/search.pipe';
import { FollowersPipe } from './pipes/followers.pipe';
import { FollowingsPipe } from './pipes/followings.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    NavbarComponent,
    HomeComponent,
    PostformComponent,
    MypostsComponent,
    SummaryComponent,
    PeopleComponent,
    FollowersComponent,
    FollowingComponent,
    ProfileComponent,
    ForgotpasswordComponent,
    SearchPipe,
    FollowersPipe,
    FollowingsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    NgxDropzoneModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
