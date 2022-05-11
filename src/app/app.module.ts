import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { CountryComponent } from './country/country.component';
import { BeerComponent } from './beer/beer.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './category/create/create.component';
import { EditComponent } from './category/edit/edit.component';
import { DetailComponent } from './category/detail/detail.component';
import { ListComponent } from './category/list/list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    CountryComponent,
    BeerComponent,
    ManufacturerComponent,
    SidebarComponent,
    CreateComponent,
    EditComponent,
    DetailComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
