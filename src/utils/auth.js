export const checkToken = () => {
    const userToken = localStorage.getItem('userInfo');
  
    if (userToken) {
      console.log('Token exists:', userToken);
      const token = userToken
      return true;
    } else {
      console.log('Token does not exist');
      return false;
    }
  };
  