import { Component, OnInit } from '@angular/core'
import { ProductService } from 'src/app/services/product.service'

@Component({
	selector: 'app-shop-content',
	templateUrl: './shop-content.component.html',
	styleUrls: ['./shop-content.component.css'],
})
export class ShopContentComponent implements OnInit {
	produtos: any

	constructor(private productService: ProductService) {}

	ngOnInit() {
		this.productService.getProdutos().subscribe(
			(data) => {
				this.produtos = data['produtos']
			},
			(error) => {
				console.log(error)
			}
		)
	}

	getQtdeProdutos(): number {
		return this.produtos.length
	}
}
