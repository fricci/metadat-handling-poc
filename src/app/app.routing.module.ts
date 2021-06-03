import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PageViewComponent } from './pageview/pageview.component';
import { PanelViewComponent } from './panelview/panelview.component';

const routes: Routes = [
    { path: 'pageView/:id', component: PageViewComponent },
    { path: 'panelView/:id', component: PanelViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }