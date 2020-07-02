import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-newsletter',
	templateUrl: './newsletter.component.html',
	styleUrls: ['./newsletter.component.css'],
})
export class NewsletterComponent implements OnInit {
	textNewsLetter = 'Você vai receber os melhores descontos'
	permiteNewsLetter = false
	email = 'teste@teste.com'
	constructor() {
		this.textNewsLetter
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.permiteNewsLetter = true
		}, 5000)
	}

	onSubmitNewsLetter() {
		this.textNewsLetter = 'E-mail enviado'
	}

	onEmailEnter(event: Event) {
		this.email = (<HTMLInputElement>event.target).value
	}
}
