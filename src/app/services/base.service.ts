import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export class BaseService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(protected baseUrl: string, protected httpClient: HttpClient) {
    httpClient.options(baseUrl, this.httpOptions)
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
