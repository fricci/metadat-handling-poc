import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PageViewComponent } from './pageview/pageview.component';
import { PanelViewComponent } from './panelview/panelview.component';

const routes: Routes = [
    { path: 'pageView/:id', component: PageViewComponent },
    { path: 'panelView/:id', component: PanelViewComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }