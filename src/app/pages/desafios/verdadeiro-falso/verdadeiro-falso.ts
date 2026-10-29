
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  QuizService,
  Pergunta,
  ResultadoResposta
} from '../../../services/quiz';

@Component({
  selector: 'app-verdadeiro-falso',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './verdadeiro-falso.html',
  styleUrl: './verdadeiro-falso.scss',
})
export class VerdadeiroFalso implements OnInit {
  pergunta: Pergunta | null = null;
  resposta: boolean | null = null;
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

    this.quizService.buscarPerguntas('verdadeiro-falso').subscribe({
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

  responder(valor: boolean) {
    if (this.resposta !== null || !this.pergunta) return;

    this.resposta = valor;
    this.resultado = null;
    this.erro = '';

    // O backend espera 1 para verdadeiro e 0 para falso.
    const valorEnviado = valor ? 0 : 1;

    this.quizService.responder(
      this.pergunta.id,
      valorEnviado
    ).subscribe({
      next: (resultado: ResultadoResposta) => {
        this.resultado = resultado;
      },
      error: () => {
        this.erro = 'Não foi possível verificar sua resposta.';
        this.resposta = null;
      }
    });
  }

  reiniciar() {
    this.resposta = null;
    this.resultado = null;
    this.carregarPergunta();
  }
}
