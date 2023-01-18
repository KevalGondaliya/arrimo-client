export const setUserToken = (data:string) => {
    localStorage.setItem("user", data);
  };
  
  export const getUserToken = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const item = localStorage.getItem('user')
        return item;
      }
      return null
  };
  