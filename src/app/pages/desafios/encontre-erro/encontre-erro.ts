
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-encontre-erro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './encontre-erro.html',
  styleUrl: './encontre-erro.scss',
})
export class EncontreErro {
  selecionada: number | null = null;

  opcoes = [
    {
      texto: '"A menina" é o sujeito.',
      correta: false,
    },
    {
      texto: '"Comprou um caderno" é o predicado.',
      correta: false,
    },
    {
      texto: '"Um caderno" é o sujeito.',
      correta: true,
    },
  ];

  responder(indice: number) {
    if (this.selecionada !== null) return;
    this.selecionada = indice;
  }

  reiniciar() {
    this.selecionada = null;
  }
}
