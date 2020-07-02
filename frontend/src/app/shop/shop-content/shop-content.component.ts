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

	ngOnInit(): void {
		this.productService.getProdutos().subscribe(
			(data) => {
				console.log(data)
				this.produtos = data['produtos']
			},
			(error) => {
				console.log(error)
			}
		)
		// this.produtos = []
		// this.produtos.push({ nome: 'Bateria', preco: 170.4 })
		// this.produtos.push({ nome: 'TV', preco: 1100.0 })
		// this.produtos.push({ nome: 'Monitor', preco: 600.0 })
		// this.produtos.push({ nome: 'Mouse', preco: 170.4 })
		// this.produtos.push({ nome: 'Teclado', preco: 170.4 })
	}

	getQtdeProdutos(): number {
		return this.produtos.length
	}
}
