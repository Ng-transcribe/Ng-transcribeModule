import { Pipe, PipeTransform } from '@angular/core';

import { i18n } from './utils'

@Pipe({
    name : 'translate'
})
export class NgTranscribePipe implements PipeTransform {

    constructor (private i18n: i18n) {}

    transform(value: string, args: string[] = []): string {
        return this.i18n.translate(value, args)
    }
}
