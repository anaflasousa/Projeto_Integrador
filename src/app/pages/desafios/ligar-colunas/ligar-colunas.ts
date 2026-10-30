
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  perguntas: Pergunta[] = [];
  pergunta: Pergunta | null = null;

  indiceAtual = 0;
  selecionado: number | null = null;
  respostas: Record<number, number> = {};

  resultado: ResultadoResposta | null = null;
  feedback = '';

  carregando = true;
  enviando = false;
  erro = '';

  classificacoes: string[] = [];

  constructor(
    private quizService: QuizService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarPergunta();
  }

  carregarPergunta(): void {
    this.carregando = true;
    this.erro = '';

    this.quizService.buscarPerguntas('ligar-colunas').subscribe({
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
    this.classificacoes = this.pergunta?.opcoes ?? [];

    this.selecionado = null;
    this.respostas = {};
    this.resultado = null;
    this.feedback = '';
    this.erro = '';
  }

  escolherTermo(indice: number): void {
    if (
      this.enviando ||
      this.resultado !== null ||
      this.respostas[indice] !== undefined
    ) {
      return;
    }

    this.selecionado = indice;
    this.feedback = '';
  }

  escolherClassificacao(indice: number): void {
    if (
      this.selecionado === null ||
      this.enviando ||
      this.resultado !== null
    ) {
      return;
    }

    this.respostas = {
      ...this.respostas,
      [this.selecionado]: indice
    };

    this.selecionado = null;

    const totalTermos = this.pergunta?.itens?.length ?? 0;

    if (Object.keys(this.respostas).length === totalTermos) {
      this.verificarRespostas();
    }
  }

  verificarRespostas(): void {
    if (!this.pergunta) return;

    this.enviando = true;
    this.erro = '';

    this.quizService.verificarAssociacoes(
      this.pergunta.id,
      this.respostas
    ).subscribe({
      next: (resultado: ResultadoResposta) => {
        this.resultado = resultado;
        this.enviando = false;
        this.feedback = resultado.explicacao;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao verificar associações:', erro);
        this.enviando = false;
        this.erro = 'Não foi possível verificar as associações.';
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

  get termos() {
    return this.pergunta?.itens ?? [];
  }
}
