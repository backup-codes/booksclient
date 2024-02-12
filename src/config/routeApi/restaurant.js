import { restaurantAxiosInstance } from "../apiInterceptor";

const adminLogin = async (data) => {
  try {
    const response = await restaurantAxiosInstance.post("adminLoginVerification",data);
    return response;

  } catch (error) {

    console.log(error);
    
  }
};

const employeeLogin = async (data)=>{
  try {
    const response = await restaurantAxiosInstance.post("employeeSignInVerification",data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const sendFeedback = async (data)=>{
  try {
    const response = await restaurantAxiosInstance.post("sendFeedback",data);
    return response;
  } catch (error) {
    console.log(error);
  }
}


export { adminLogin,employeeLogin,sendFeedback };
