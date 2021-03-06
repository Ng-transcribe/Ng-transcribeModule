import { Injectable } from '@angular/core'

declare global {
    interface Window { locale: any; }
}

@Injectable({
    providedIn: 'root'
})
export class i18n {

    locale = window.locale
    conf = window.locale.configuration

    constructor () {}

    init (configuration) {
        this.conf = {...this.conf, ...configuration}
    }

    translate (key: string, args: string[]) : string {
        let result = this.getValue(key)
        if(args && args.length > 0) {
            result = this.replaceValues(result,args)
        }
        return result
    }

    getValue (key: string) : string {
        let result: string = ''
        let language = this.conf.language
        if(language) {
          let fallback = this.conf.fallback
          let keys = key.split('.')
          if (keys.length > 1) {
          result = fallback ? this.getDepthValue(this.locale[language], keys) || this.getDepthValue(this.locale[fallback], keys) : this.getDepthValue(this.locale[language], keys)
          } else {
              result = fallback ? this.locale[language][key] || this.locale[fallback][key] : this.locale[language][key]
          }
        }
        return result || key
    }

    getDepthValue (codes: object, keys: string[]) : string {
        let result : string = ''
        let schema = {...codes}
        for(let key=0; key < keys.length; key++){
            let element = schema[keys[key]]
            if(!element) break
            if(key !== keys.length-1 && typeof element == 'string') break
            if(key == keys.length-1 && typeof element == 'string') result = element
            else schema = element
        }
        return result
    }

    replaceValues (str: string, args: string[]) : string {
        const regex = /(?:^|\s)(#\{[a-z0-9]\w*\})(?:$|\s)/gi
        const matches = str.match(regex)
        for(let i=0; i<matches.length; i++) {
            let valueToReplace = args[i] || ''
            str = str.replace(matches[i].trim(), valueToReplace)
        }
        return str
    }

    updateValue (key: string, value: string): void {
      let keys = key.split('.')
        if (keys.length > 1) {
          this.updateDepthValue(this.locale[this.conf.language], keys, value, 0)
        } else {
          this.locale[this.conf.language][key] = value
        }
    }

    updateDepthValue (schema: any, keys: string[], value: string, iterator: number) {
      if(iterator == keys.length-1) {
        schema[keys[iterator]] = value
        return
      }
      if(!schema[keys[iterator]]) {
          schema[keys[iterator]] = {}
          this.updateDepthValue(schema, keys, value, iterator+1)
      } else {
          this.updateDepthValue(schema[keys[iterator]], keys, value, iterator+1)
      }
    }

    changeLanguage (languageCode: string) {
        //Can utilize localstorage or session storage
        this.conf.language = languageCode
        window.location.reload()
    }
}
