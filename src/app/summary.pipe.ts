import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})
export class SummaryPipe implements PipeTransform {
    transform(value: string, limit?: any, uppercase?: boolean) {
        if (!value)
            return null;

        let actualLimit = (limit) ? limit : 50,
            result = value.substr(0, actualLimit) + '...';

        if (uppercase)
            result = result.toUpperCase();

        return result;
    }
}