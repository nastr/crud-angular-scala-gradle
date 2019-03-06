import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-baza.dialog',
    templateUrl: './edit.html',
    styleUrls: ['./edit.css']
})
export class EditComponent implements OnInit {
    data: Product = {'id': null, 'name': '', 'color': ''};
    private id: number;
    exist = false;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataService: ProductService) {
    }

    updateProduct() {
        console.log("updateProduct", this.data);
        this.dataService.update(this.data).subscribe(() => this.router.navigate(['/']));
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            // console.log(this.activatedRoute.snapshot.url); // array of states
            // console.log(this.activatedRoute.snapshot.url[0].path);
            this.id = +params['id'];
        });
        this.dataService.get(this.id).subscribe(product => {
            this.exist = true;
            this.data = product;
        });
    }

}
