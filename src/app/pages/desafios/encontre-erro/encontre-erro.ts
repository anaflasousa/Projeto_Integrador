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
  pergunta: Pergunta | null = null;
  selecionada: number | null = null;
  resultado: ResultadoResposta | null = null;

  carregando = true;
  erro = '';

  constructor(
    private quizService: QuizService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('Tela Encontre o Erro iniciou');
    this.carregarPergunta();
  }

  carregarPergunta(): void {
    this.carregando = true;
    this.erro = '';
    console.log('Buscando perguntas do backend...');

    this.quizService.buscarPerguntas('encontre-erro').subscribe({
      next: (perguntas: Pergunta[]) => {
        console.log('Perguntas recebidas:', perguntas);

        this.pergunta = perguntas[0] ?? null;
        this.carregando = false;

        if (!this.pergunta) {
          this.erro = 'Nenhuma pergunta encontrada.';
        }

        this.cdr.detectChanges();
      },
      error: () => {
        this.carregando = false;
        this.erro = 'Não foi possível carregar a pergunta.';

        this.cdr.detectChanges();
      }
    });
  }

  responder(indice: number): void {
    if (this.selecionada !== null || !this.pergunta) return;

    console.log('Alternativa clicada:', indice);

    this.selecionada = indice;
    this.erro = '';

    this.quizService.responder(this.pergunta.id, indice).subscribe({
      next: (resultado: ResultadoResposta) => {
        console.log('Resultado recebido:', resultado);
        this.resultado = resultado;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao verificar resposta:', erro);
        this.selecionada = null;
        this.erro = 'Não foi possível verificar sua resposta.';
        this.cdr.detectChanges();
      }
    });
  }

  reiniciar(): void {
    this.selecionada = null;
    this.resultado = null;
    this.erro = '';
  }
}
