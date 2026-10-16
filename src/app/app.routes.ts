
import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { SelecaoJogos } from './pages/selecao-jogos/selecao-jogos';

import { Quiz } from './pages/desafios/quiz/quiz';
import { LigarColunas } from './pages/desafios/ligar-colunas/ligar-colunas';
import { VerdadeiroFalso } from './pages/desafios/verdadeiro-falso/verdadeiro-falso';
import { EncontreErro } from './pages/desafios/encontre-erro/encontre-erro';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'jogos', component: SelecaoJogos },
  { path: 'jogos/quiz', component: Quiz },
  { path: 'jogos/ligar-colunas', component: LigarColunas },
  { path: 'jogos/verdadeiro-falso', component: VerdadeiroFalso },
  { path: 'jogos/encontre-erro', component: EncontreErro },
  { path: '**', redirectTo: '' },
];
