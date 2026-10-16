
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ligar-colunas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ligar-colunas.html',
  styleUrl: './ligar-colunas.scss',
})
export class LigarColunas {
  selecionado: number | null = null;
  respostas: Record<number, number> = {};
  feedback = '';

  termos = [
    { texto: 'O menino', correta: 0 },
    { texto: 'Comprou um livro', correta: 1 },
    { texto: 'Ontem', correta: 2 },
  ];

  classificacoes = [
    'Sujeito',
    'Predicado',
    'Adjunto adverbial de tempo',
  ];

  escolherTermo(indice: number) {
    this.selecionado = indice;
    this.feedback = '';
  }

  escolherClassificacao(indice: number) {
    if (this.selecionado === null) return;

    this.respostas = {
      ...this.respostas,
      [this.selecionado]: indice,
    };

    this.selecionado = null;

    const corretas = Object.keys(this.respostas).filter(
      chave => this.respostas[Number(chave)] ===
        this.termos[Number(chave)].correta
    ).length;

    this.feedback = `${corretas} de ${this.termos.length} associações corretas.`;
  }

  get concluiu() {
    return this.termos.every(
      (_, i) => this.respostas[i] === this.termos[i].correta
    );
  }

  reiniciar() {
    this.selecionado = null;
    this.respostas = {};
    this.feedback = '';
  }
}
