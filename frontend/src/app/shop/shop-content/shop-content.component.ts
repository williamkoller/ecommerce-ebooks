import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-shop-content',
	templateUrl: './shop-content.component.html',
	styleUrls: ['./shop-content.component.css'],
})
export class ShopContentComponent implements OnInit {
	qtdeProdutos: number = 200

	constructor() {}

	ngOnInit(): void {}

	getqntdProdutos(): number {
		return this.qtdeProdutos
	}
}
