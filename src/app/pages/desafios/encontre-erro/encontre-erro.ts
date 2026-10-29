
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  QuizService,
  Pergunta,
  ResultadoResposta
} from '../../../services/quiz';

@Component({
  selector: 'app-encontre-erro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './encontre-erro.html',
  styleUrl: './encontre-erro.scss',
})
export class EncontreErro implements OnInit {
  pergunta: Pergunta | null = null;
  selecionada: number | null = null;
  resultado: ResultadoResposta | null = null;

  carregando = true;
  erro = '';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.carregarPergunta();
  }

  carregarPergunta(): void {
    this.carregando = true;
    this.erro = '';

    this.quizService.buscarPerguntas('encontre-erro').subscribe({
      next: (perguntas: Pergunta[]) => {
        this.pergunta = perguntas[0] ?? null;
        this.carregando = false;

        if (!this.pergunta) {
          this.erro = 'Nenhuma pergunta encontrada.';
        }
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar a pergunta.';
      }
    });
  }

  responder(indice: number): void {
    if (this.selecionada !== null || !this.pergunta) return;

    this.selecionada = indice;
    this.erro = '';

    this.quizService.responder(this.pergunta.id, indice).subscribe({
      next: (resultado: ResultadoResposta) => {
        this.resultado = resultado;
      },
      error: () => {
        this.selecionada = null;
        this.erro = 'Não foi possível verificar sua resposta.';
      }
    });
  }

  reiniciar(): void {
    this.selecionada = null;
    this.resultado = null;
    this.erro = '';
  }
}
