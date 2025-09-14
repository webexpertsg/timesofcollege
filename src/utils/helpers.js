export const hasNotEmptyValue = (obj) => {
    return Object.values(obj).some(value => {
      return value !== null || typeof value !== 'undefined' || value !== '';
    });
}

export const commaWithSingleQuotes = (value) => {
    if(value==null || value===undefined || value===''){
        return '';
    }
    return value.split(',').map(number => number.toString());
} 