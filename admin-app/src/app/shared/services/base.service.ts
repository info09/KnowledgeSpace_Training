import { throwError } from 'rxjs';

export abstract class BaseService {
  constructor() {}
  protected handlerError(error: any) {
    const applicationEror = error.header.get('Application-Error');

    if (applicationEror) {
      return throwError(applicationEror);
    }

    let modelStateErrors = '';
    for (const key in error.error) {
      if (error.error[key]) {
        modelStateErrors += error.error[key].description + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return throwError(modelStateErrors || 'Server error');
  }
}
