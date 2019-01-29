import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  products: Array<Product> | null;

  constructor(private dataService: ProductService) {
  }

  ngOnInit() {
    this.dataService.list().subscribe(res => {
      this.products = res;
    });
  }

  deleteItem(product: Product) {
    if (confirm('Are you sure?')) {
      this.dataService.delete(product).subscribe();
      this.products.splice(this.products.indexOf(product), 1);
    }
  }
}
