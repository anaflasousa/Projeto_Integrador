
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
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
  perguntas: Pergunta[] = [];
  selecionada: number | null = null;
  resultado: ResultadoResposta | null = null;
  indiceAtual = 0;
  carregando = true;
  erro = '';

  acertos = 0;
  erros = 0;

  porcentagem = 0;
  finalizado = false;
  

  constructor(
    private quizService: QuizService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarPergunta();
  }
  
  reiniciar() {
  this.indiceAtual = 0;
  this.selecionada = null;
  this.resultado = null;
  this.acertos = 0;
  this.erros = 0;
  this.porcentagem = 0;
  this.finalizado = false;
  this.carregarPergunta();
}

  carregarPergunta() {
  this.carregando = true;
  this.erro = '';



  this.quizService.buscarPerguntas('quiz').subscribe({
    next: (perguntas: Pergunta[]) => {
      this.perguntas = perguntas;
      this.pergunta = perguntas[this.indiceAtual] ?? null;

      this.carregando = false;

      if (!this.pergunta) {
        this.erro = 'Não há mais perguntas disponíveis.';
      }

      this.cdr.detectChanges();
    },

    error: (erro) => {
      console.error('Erro ao carregar perguntas:', erro);

      this.erro = 'Não foi possível carregar as perguntas.';
      this.carregando = false;

      this.cdr.detectChanges();
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

        if (resultado.correta) {
          this.acertos++;
        } else {
          this.erros++;
        }

        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao verificar resposta:', erro);

        this.erro = 'Não foi possível verificar sua resposta.';
        this.selecionada = null;

        this.cdr.detectChanges();
      }
    });
  }

 proxima() {
  if (this.indiceAtual < this.perguntas.length - 1) {
    this.indiceAtual++;
    this.selecionada = null;
    this.resultado = null;
    this.carregarPergunta();
  } else {
    this.finalizado = true;

    const total = this.acertos + this.erros;

    this.porcentagem = total > 0
      ? Math.round((this.acertos / total) * 100)
      : 0;
  }
}
}
