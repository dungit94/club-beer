import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerComponent } from './beer/beer.component';
import { CategoryComponent } from './category/category.component';
import { CreateComponent } from './category/create/create.component';
import { EditComponent } from './category/edit/edit.component';
import { ListComponent } from './category/list/list.component';
import { CountryComponent } from './country/country.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';

const routes: Routes = [
  { 
    path: 'categorys', component: CategoryComponent,
    children : [
      {path: '', component: ListComponent},
      {path: 'create', component: CreateComponent},
      {path: 'edit/:id', component: EditComponent}
    ]
  },
  { path: 'beers', component: BeerComponent },
  { path: 'manufacturers', component: ManufacturerComponent },
  { path: 'countrys', component: CountryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
