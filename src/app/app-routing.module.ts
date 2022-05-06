import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerComponent } from './beer/beer.component';
import { CategoryComponent } from './category/category.component';
import { CountryComponent } from './country/country.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';

const routes: Routes = [
  { path: 'categorys', component: CategoryComponent },
  { path: 'beers', component: BeerComponent },
  { path: 'manufacturers', component: ManufacturerComponent },
  { path: 'countrys', component: CountryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
