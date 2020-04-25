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
        let keys = key.split('.')
        if (keys.length > 1) {
        result = this.getDepthValue(this.locale[this.conf.language], keys) || this.getDepthValue(this.locale[this.conf.fallback], keys)
        } else {
            result = this.locale[this.conf.language][key] || this.locale[this.conf.fallback][key]
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

    changeLanguage (languageCode: string) {
        //Can utilize localstorage or session storage
        this.conf.language = languageCode
        window.location.reload()
    }
}
