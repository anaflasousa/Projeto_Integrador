
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  perguntas: Pergunta[] = [];
  pergunta: Pergunta | null = null;

  indiceAtual = 0;
  resposta: boolean | null = null;
  resultado: ResultadoResposta | null = null;

  carregando = true;
  erro = '';

  constructor(
    private quizService: QuizService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarPerguntas();
  }

  carregarPerguntas(): void {
    this.carregando = true;
    this.erro = '';

    this.quizService.buscarPerguntas('verdadeiro-falso').subscribe({
      next: (perguntas: Pergunta[]) => {
        this.perguntas = perguntas;
        this.indiceAtual = 0;

        this.atualizarPergunta();
        this.carregando = false;

        if (this.perguntas.length === 0) {
          this.erro = 'Nenhuma pergunta encontrada.';
        }

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar perguntas:', erro);

        this.carregando = false;
        this.erro = 'Não foi possível carregar as perguntas.';

        this.cdr.detectChanges();
      }
    });
  }

  atualizarPergunta(): void {
    this.pergunta = this.perguntas[this.indiceAtual] ?? null;
    this.resposta = null;
    this.resultado = null;
    this.erro = '';
  }

  responder(valor: boolean): void {
    if (this.resposta !== null || !this.pergunta) return;

    this.resposta = valor;
    this.erro = '';

    // 0 representa Verdadeiro e 1 representa Falso.
    const valorEnviado = valor ? 0 : 1;

    this.quizService.responder(
      this.pergunta.id,
      valorEnviado
    ).subscribe({
      next: (resultado: ResultadoResposta) => {
        this.resultado = resultado;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao verificar resposta:', erro);

        this.erro = 'Não foi possível verificar sua resposta.';
        this.resposta = null;

        this.cdr.detectChanges();
      }
    });
  }

  proxima(): void {
    this.indiceAtual++;
    this.atualizarPergunta();
  }

  reiniciar(): void {
    this.indiceAtual = 0;
    this.atualizarPergunta();
  }

  get concluiu(): boolean {
    return this.indiceAtual >= this.perguntas.length;
  }
}
