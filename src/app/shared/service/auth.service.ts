import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, retryWhen, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://anchormt-world-staging-at4dfab73a-lz.a.run.app/countries';

  data = new BehaviorSubject<object>({});

  getObjectData(): Observable<object> {
    return this.data.asObservable();
  }

  saveNewData(newObjectData: object) {
    // Get the existing data from the Subject.
    const existingObjectData = this.data.getValue();

    // Merge the new data with the existing data.
    const mergedObjectData = { ...existingObjectData, ...newObjectData };

    // Publish the merged data to the Subject.
    this.data.next(mergedObjectData);
    sessionStorage.setItem('data', JSON.stringify(this.data.getValue()));
  }

  constructor(private http: HttpClient) {}

  Get(endPoint: string, header?: HttpHeaders): Observable<any> {
    return this.http.get<any>(this.baseUrl + endPoint, {
      headers: header,
    });
  }

  getCountries(): Observable<any> {
    return this.http
      .get(this.baseUrl)
      .pipe(retryWhen((errors) => errors.pipe(delay(2000), take(3))));
  }

  header = new HttpHeaders({
    "Authorization": 'Bearer abc123',
    "Accept": 'application/json',
    'Accept-Language': localStorage.getItem('curentLang') ?? '',
  });
}
