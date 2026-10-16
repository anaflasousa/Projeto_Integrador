
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  selecionada: number | null = null;

  alternativas = [
    'Sujeito',
    'Objeto direto',
    'Predicado',
    'Adjunto adverbial',
  ];

  responder(indice: number) {
    if (this.selecionada !== null) return;
    this.selecionada = indice;
  }

  proxima() {
    this.selecionada = null;
  }
}
