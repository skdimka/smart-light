export const isValidInput = {
      email: (value: string) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(value);
      },
    
      name: (value: string) => {
        return value.length > 1;
      },
    
      password: (value: string) => {
        return value.length > 4;
      },
    
      passwordsMatch: (password: string, confirm_password: string) => {
        return password === confirm_password;
      }
}