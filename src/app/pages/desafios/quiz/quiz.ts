
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
  selecionada: number | null = null;
  resultado: ResultadoResposta | null = null;
  indiceAtual = 0;
  carregando = true;
  erro = '';

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
  this.carregarPergunta();
}

  carregarPergunta() {
  this.carregando = true;
  this.erro = '';



  this.quizService.buscarPerguntas('quiz').subscribe({
    next: (perguntas: Pergunta[]) => {

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
  this.indiceAtual++;

  this.selecionada = null;
  this.resultado = null;

  this.carregarPergunta();
}
}
