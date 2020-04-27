import { Injectable } from '@angular/core';
import { i18n } from './utils'


@Injectable({
  providedIn: 'root'
})
export class NgTranscribeService {

  constructor (private i18n:i18n) {}

    t(key: string, args: string[] = []) {
        return this.i18n.translate(key,args)
    }

    update(key: string, value: string) : void{
      this.i18n.updateValue(key, value)
    }

    changeLanguage(languageCode: string) {
        this.i18n.changeLanguage(languageCode)
    }
}
