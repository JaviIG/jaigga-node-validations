export function isNullOrUndefined(value: any): boolean {
    return value === undefined || value === null;
}

export function isEmpty(value: any): boolean {
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    } else {
        return String(value).trim().length === 0;
    }
}

export function isBlank(value:any){
   return isNullOrUndefined(value) || isEmpty(value)
}