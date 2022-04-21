import { throwError } from "rxjs";

export abstract class BaseService {
    constructor() {}

    protected handleError(error: any){
        const applicationError = error.headers.get('Application-Error');

        if(applicationError){
            return throwError(applicationError);
        }

        let modelStateErrors = '';

        for(const key in error.error){
            if(error.error[key]){
                modelStateErrors += error.error[key].description+'\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return throwError(modelStateErrors || 'Server error');
    }
}