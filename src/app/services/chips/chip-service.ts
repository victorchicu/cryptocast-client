import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseService} from "../base-service";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {ChipDto} from "../../shared/dto/chip-dto";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChipService extends BaseService {
  static readonly API_PATH: string = "/api/chips"

  constructor(protected httpClient: HttpClient) {
    super(ChipService.API_PATH, httpClient);
  }

  public addChip(chipDto: ChipDto): Observable<ChipDto> {
    return this.httpClient.post<ChipDto>(ChipService.API_PATH, chipDto, this.httpOptions)
      .pipe(
        catchError(this.handleError<ChipDto>('addChip'))
      )
  }

  public removeChip(name: string): Observable<void> {
    const url: string = `${ChipService.API_PATH}/${name}`;
    return this.httpClient.delete<void>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('removeChip'))
      )
  }

  public listChips(params: HttpParams): Observable<ChipDto[]> {
    const options = {
      params: params,
    }
    return this.httpClient.get<ChipDto[]>(ChipService.API_PATH, options)
      .pipe(
        catchError(this.handleError<ChipDto[]>('listChips'))
      )
  }
}
