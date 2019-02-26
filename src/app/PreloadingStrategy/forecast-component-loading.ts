import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class ForecastComponentLoading implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any>{
        console.log("Preload Path : ", route.path);
        return route.data && route.data.preload ? load() : of(null);
    }
}
