import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
	@Input() produto: { nome: string; preco: number; imagem_produto: string }
	constructor() {}

	ngOnInit(): void {
		this.produto = {
			nome: 'Harry',
			preco: 900,
			imagem_produto: 'uploads/2020-07-01T03:11:14.412Zharry-potter.jpg',
		}
	}
}
