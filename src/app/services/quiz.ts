
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pergunta {
  id: string;
  tipo: string;
  enunciado: string;
  opcoes?: string[];
  itens?: {
    texto: string;
  }[];
}

export interface ResultadoResposta {
  correta: boolean;
  explicacao: string;
  resultados?: Record<string, boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly apiUrl = 'http://localhost:3333/api/perguntas';

  constructor(private http: HttpClient) { }

  buscarPerguntas(tipo: string): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(`${this.apiUrl}/${tipo}`);
  }

  responder(id: string, resposta: unknown): Observable<ResultadoResposta> {
    return this.http.post<ResultadoResposta>(
      `${this.apiUrl}/${id}/responder`,
      { resposta }
    );
  }
  verificarAssociacoes(
    id: string,
    respostas: Record<number, number>
  ): Observable<ResultadoResposta> {
    return this.http.post<ResultadoResposta>(
      `${this.apiUrl}/${id}/responder`,
      { resposta: respostas }
    );
  }
}
