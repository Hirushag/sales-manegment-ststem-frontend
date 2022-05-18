import { AddingfoodService } from 'src/app/services/addingfood.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { DeliveryService } from './services/delivery.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './layouts/auth/auth.component';
import { JwtService } from './services/jwt.service';
import { AuthService } from './services/auth.service';
import { MainApiService } from './services/main-api.service';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { NotificationUtilsService } from './utils/notification-utils.service';
import { BlockUIModule } from 'ng-block-ui';
import { BookingService } from './services/booking.service';
import { CsvDataService } from './services/csv-data.service';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [AppComponent, AuthComponent, AdminLayoutComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BlockUIModule.forRoot(),
    AuthModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    MatInputModule,
  ],
  providers: [
    JwtService,
    AuthService,
    MainApiService,
    NotificationUtilsService,
    BookingService,
    CsvDataService,
    DeliveryService,
    VehicleService,
    AddingfoodService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
