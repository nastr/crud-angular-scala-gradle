import {Component, Inject} from '@angular/core';
import {Product} from '../model/product.model';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})

export class AddComponent {
  confirmationString = 'new Product has beed added';
  isAdded = false;

  constructor(public dataService: ProductService) {
  }

  addNewProduct(product: Product) {
    this.dataService.create(product).subscribe();
    this.isAdded = true;
  }
}
