import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './service/product.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableComponent} from './table/table.component';
import {RouterModule, Routes} from '@angular/router';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'add', component: AddComponent},
  {path: 'update/:id', component: EditComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
