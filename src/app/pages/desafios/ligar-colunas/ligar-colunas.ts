
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  QuizService,
  Pergunta,
  ResultadoResposta
} from '../../../services/quiz';

@Component({
  selector: 'app-ligar-colunas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ligar-colunas.html',
  styleUrl: './ligar-colunas.scss',
})
export class LigarColunas implements OnInit {
  pergunta: Pergunta | null = null;

  selecionado: number | null = null;
  respostas: Record<number, number> = {};

  resultado: ResultadoResposta | null = null;
  feedback = '';

  carregando = true;
  enviando = false;
  erro = '';

  classificacoes: string[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.carregarPergunta();
  }

  carregarPergunta(): void {
    this.carregando = true;
    this.erro = '';

    this.quizService.buscarPerguntas('ligar-colunas').subscribe({
      next: (perguntas: Pergunta[]) => {
        this.pergunta = perguntas[0] ?? null;
        this.carregando = false;

        if (!this.pergunta) {
          this.erro = 'Nenhuma pergunta encontrada.';
          return;
        }

        this.classificacoes = this.pergunta.opcoes ?? [];
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar a pergunta.';
      }
    });
  }

  escolherTermo(indice: number): void {
    if (this.enviando || this.resultado?.correta) return;

    this.selecionado = indice;
    this.feedback = '';
  }

  escolherClassificacao(indice: number): void {
    if (
      this.selecionado === null ||
      this.enviando ||
      this.resultado?.correta
    ) {
      return;
    }

    this.respostas = {
      ...this.respostas,
      [this.selecionado]: indice,
    };

    this.selecionado = null;
    this.feedback = '';

    const totalTermos = this.pergunta?.itens?.length ?? 0;

    if (Object.keys(this.respostas).length === totalTermos) {
      this.verificarRespostas();
    }
  }

  verificarRespostas(): void {
    if (!this.pergunta) return;

    this.enviando = true;
    this.erro = '';

    this.quizService
      .verificarAssociacoes(this.pergunta.id, this.respostas)
      .subscribe({
        next: (resultado: ResultadoResposta) => {
          this.resultado = resultado;
          this.enviando = false;
          this.feedback = resultado.explicacao;
        },
        error: () => {
          this.enviando = false;
          this.erro = 'Não foi possível verificar as associações.';
        }
      });
  }

  get concluiu(): boolean {
    return this.resultado?.correta === true;
  }

  get termos() {
    return this.pergunta?.itens ?? [];
  }

  reiniciar(): void {
    this.selecionado = null;
    this.respostas = {};
    this.resultado = null;
    this.feedback = '';
    this.erro = '';
  }
}
