import { Component, OnInit, effect, inject } from '@angular/core';
import { ProductService } from 'src/app/servicio/product.service';
import { productoM } from '../home/productModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  servi = inject(ProductService)
  cantidad: number = 0
constructor(){
  effect(()=>{
    this.cantidad = this.servi.cantidadsignal()
  })
}
  ngOnInit(): void {

  }
}
