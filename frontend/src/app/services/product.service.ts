import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	SERVER_URL = 'http://localhost:3000'

	constructor(private http: HttpClient) {}

	public getProdutos() {
		return this.http.get(`${this.SERVER_URL}/produtos`)
	}
}
