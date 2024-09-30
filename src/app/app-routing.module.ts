import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductoComponent } from './component/producto/producto.component';
import { FacturaComponent } from './component/factura/factura.component';

const routes: Routes = [
  {
  path: 'home',
  component: HomeComponent
},
{
  path: 'factura',
  component: FacturaComponent
},
{
  path: 'producto',
  component: ProductoComponent
},
{
  path: '',
  component: HomeComponent
},
{
  path: '**',
  redirectTo:'home'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
