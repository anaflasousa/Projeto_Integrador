
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verdadeiro-falso',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './verdadeiro-falso.html',
  styleUrl: './verdadeiro-falso.scss',
})
export class VerdadeiroFalso {
  resposta: boolean | null = null;

  responder(valor: boolean) {
    if (this.resposta !== null) return;
    this.resposta = valor;
  }

  reiniciar() {
    this.resposta = null;
  }
}
