import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularComponent } from './MyComponent/angular/angular.component';
import { AppComponent } from './app.component';
const routes: Routes = [{ path: 'angular', component: AngularComponent },
{path:'home',
component: AppComponent
},
{ path: '',
redirectTo: '/app-root',
// component: AppComponent,
pathMatch: 'full',
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
