import { Injectable } from '@angular/core';
import { i18n } from './utils'


@Injectable({
  providedIn: 'root'
})
export class NgTranscribeService {

  constructor (private i18n:i18n) {}

    t(value: string, args: string[] = []) {
        return this.i18n.translate(value,args)
    }

    changeLanguage(languageCode: string) {
        this.i18n.changeLanguage(languageCode)
    }
}
