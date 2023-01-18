export const setLocalStorageValue = (data:string) => {
    localStorage.setItem("user", data);
  };
  
  export const getLocalStorageValue = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const item = localStorage.getItem('user')
        return item;
      }
      return null
  };
  