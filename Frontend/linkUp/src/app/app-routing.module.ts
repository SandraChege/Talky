import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MypostsComponent } from './myposts/myposts.component';
import { PostformComponent } from './postform/postform.component';
import { SummaryComponent } from './summary/summary.component';
import { PeopleComponent } from './people/people.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetpasswordComponent },
  // { path: 'navbar', component:NavbarComponent},
  { path: 'home', component: HomeComponent },
  { path: 'addpost', component: PostformComponent },
  { path: 'myposts', component: MypostsComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'followers', component: FollowersComponent },
  { path:'following', component: FollowingComponent},

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
