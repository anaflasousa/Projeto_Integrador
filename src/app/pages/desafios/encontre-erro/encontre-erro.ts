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
  selector: 'app-encontre-erro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './encontre-erro.html',
  styleUrl: './encontre-erro.scss',
})
export class EncontreErro implements OnInit {
  perguntas: Pergunta[] = [];
  pergunta: Pergunta | null = null;

  indiceAtual = 0;
  selecionada: number | null = null;
  resultado: ResultadoResposta | null = null;

  acertos = 0;
  erros = 0;
  finalizado = false;
  porcentagem = 0;

  carregando = true;
  erro = '';

  constructor(
    private quizService: QuizService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.carregarPerguntas();
  }

  carregarPerguntas(): void {
    this.carregando = true;
    this.erro = '';

    this.quizService.buscarPerguntas('encontre-erro').subscribe({
      next: (perguntas: Pergunta[]) => {
        this.perguntas = perguntas;
        this.indiceAtual = 0;
        this.atualizarPergunta();
        this.carregando = false;

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

  atualizarPergunta(): void {
    this.pergunta = this.perguntas[this.indiceAtual] ?? null;
    this.selecionada = null;
    this.resultado = null;

    if (!this.pergunta) {
      this.erro = 'Não há mais perguntas disponíveis.';
    }
  }

  responder(indice: number): void {
    if (this.selecionada !== null || !this.pergunta) return;

    this.selecionada = indice;
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

        console.log('Acertos:', this.acertos);
        console.log('Erros:', this.erros);
      },
      error: (erro) => {
        console.error('Erro ao verificar resposta:', erro);
        this.selecionada = null;
        this.erro = 'Não foi possível verificar sua resposta.';
        this.cdr.detectChanges();
      }
    });
  }

  proxima(): void {
    if (this.indiceAtual < this.perguntas.length - 1) {
      this.indiceAtual++;
      this.atualizarPergunta();
    } else {
      this.finalizado = true;
    }

    const total = this.acertos + this.erros;

    this.porcentagem = total > 0 ? Math.round((this.acertos / total) * 100) : 0;
  }

  reiniciar(): void {
    this.indiceAtual = 0;
    this.acertos = 0;
    this.erros = 0;
    this.erro = '';
    this.finalizado = false;
    this.porcentagem = 0;
    this.atualizarPergunta();
  }
}
