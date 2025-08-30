export const hasNotEmptyValue = (obj) => {
    return Object.values(obj).some(value => {
      return value !== null || typeof value !== 'undefined' || value !== '';
    });
} 