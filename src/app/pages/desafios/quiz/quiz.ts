
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  QuizService,
  Pergunta,
  ResultadoResposta
} from '../../../services/quiz';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz implements OnInit {
  pergunta: Pergunta | null = null;
  selecionada: number | null = null;
  resultado: ResultadoResposta | null = null;
  carregando = true;
  erro = '';

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.carregarPergunta();
  }

  carregarPergunta() {
    this.carregando = true;
    this.erro = '';

    this.quizService.buscarPerguntas('quiz').subscribe({
      next: (perguntas: Pergunta[]) => {
        this.pergunta = perguntas[0] ?? null;
        this.carregando = false;

        if (!this.pergunta) {
          this.erro = 'Nenhuma pergunta encontrada.';
        }
      },
      error: () => {
        this.erro = 'Não foi possível carregar a pergunta.';
        this.carregando = false;
      }
    });
  }

  responder(indice: number) {
    if (this.selecionada !== null || !this.pergunta) return;

    this.selecionada = indice;
    this.resultado = null;
    this.erro = '';

    this.quizService.responder(this.pergunta.id, indice).subscribe({
      next: (resultado: ResultadoResposta) => {
        this.resultado = resultado;
      },
      error: () => {
        this.erro = 'Não foi possível verificar sua resposta.';
        this.selecionada = null;
      }
    });
  }

  proxima() {
    this.selecionada = null;
    this.resultado = null;
    this.carregarPergunta();
  }
}
