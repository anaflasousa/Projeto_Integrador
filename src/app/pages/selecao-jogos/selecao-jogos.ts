import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selecao-jogos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './selecao-jogos.html',
  styleUrl: './selecao-jogos.scss',
})
export class SelecaoJogos {}