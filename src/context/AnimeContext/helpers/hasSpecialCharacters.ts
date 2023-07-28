const hasSpecialCharacters = (str: string): boolean => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);

export default hasSpecialCharacters;
