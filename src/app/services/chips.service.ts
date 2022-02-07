import {HttpClient, HttpParams} from "@angular/common/http";
import {BaseService} from "./base-service";
import {Observable} from "rxjs";
import {ChipDto} from "../shared/dto/chip-dto";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChipsService extends BaseService {
  static readonly API_PATH: string = "/api/chips"

  constructor(protected httpClient: HttpClient) {
    super(ChipsService.API_PATH, httpClient);
  }

  public addChip(chipDto: ChipDto): Observable<ChipDto> {
    return this.httpClient.post<ChipDto>(ChipsService.API_PATH, chipDto, this.httpOptions);
  }

  public removeChip(name: string): Observable<void> {
    const url: string = `${ChipsService.API_PATH}/${name}`;
    return this.httpClient.delete<void>(url, this.httpOptions);
  }

  public listChips(params: HttpParams): Observable<ChipDto[]> {
    const options = {
      params: params,
    }
    return this.httpClient.get<ChipDto[]>(ChipsService.API_PATH, options);
  }
}
