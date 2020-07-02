import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopBarComponent } from './header/top-bar/top-bar.component';
import { HeaderMainComponent } from './header/header-main/header-main.component';
import { MainNavComponent } from './header/main-nav/main-nav.component';
import { PageMenuComponent } from './header/page-menu/page-menu.component';
import { ShopComponent } from './shop/shop.component';
import { ShopSidebarComponent } from './shop/shop-sidebar/shop-sidebar.component';
import { ShopContentComponent } from './shop/shop-content/shop-content.component';
import { ViewedComponent } from './viewed/viewed.component';
import { BrandsComponent } from './brands/brands.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FooterComponent } from './footer/footer.component';
import { CopyrightComponent } from './copyright/copyright.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    HeaderMainComponent,
    MainNavComponent,
    PageMenuComponent,
    ShopComponent,
    ShopSidebarComponent,
    ShopContentComponent,
    ViewedComponent,
    BrandsComponent,
    NewsletterComponent,
    FooterComponent,
    CopyrightComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
