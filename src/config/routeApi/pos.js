import { restaurantPosAxiosInstance } from "../apiInterceptor";

const posDashboard = async (data) => {
  try {
    const response = await restaurantPosAxiosInstance.get("posDashboard", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};


const updateProfileImage = async (file) => {
  try {
    

    const formData = new FormData();
     
      formData.append("profileImage",file)

    return await restaurantPosAxiosInstance.patch("updateProfileImage",
      formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })  
    
  }catch (err) {
    

  }
}

const KotOrder = async (data) => {
  try {
    const response = await restaurantPosAxiosInstance.post("KotOrders", data);
    return response;
  } catch (error) { 
    console.log(error);
  }
};

export const getBromagUniqueOrderId = async ()=>{
  try {
  
return await restaurantPosAxiosInstance.get('getUniqueBromagId')

  } catch (err) {

    console.log(err);
    
  }
}

const GetMenuDataAtPos = async (platform) => {
  try {


    console.log(platform,"from the pos");
return  await restaurantPosAxiosInstance.get("getMenuDataAtPos",
    {
      params: {
        platform: platform,
      },
    });

  } catch (error) {
    console.log(error);
  }
};

// const PrintBill = async (data) => {
//   try {
//     const response = await restaurantPosAxiosInstance.post("printBill", data);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

const PrintBill = async (userId) => {
  try {
    const response = await restaurantPosAxiosInstance.post("printBill", userId);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// const TodayExpense = async (data) => {
//   try {
//     const response = await restaurantPosAxiosInstance.post(
//       "todayExpense",
//       data
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };


export const GetClosingFieldData = async () => {
  try {
    return restaurantPosAxiosInstance.get('GetClosingFieldData')
  } catch (err) {
    console.log(err)
  }
}

const PosExpenseData = async () => {
  try {
    const response = await restaurantPosAxiosInstance.get("posExpenseData");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchTodaysfloatingCash  = async () => {
  try {
    const response = await restaurantPosAxiosInstance.get("fetchTodaysfloatingCash");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchOpeningData = async () => {
  
  return await restaurantPosAxiosInstance.get(
    `getOpeningData`)
}
const fetchTodaysOpeningData = async () => {
  
  return await restaurantPosAxiosInstance.get(
    `getTodayOpeningData`)
  
}

const searchTodaysExpense = async (query) => {
  
  return await restaurantPosAxiosInstance.get(
    `searchTodaysExpense/${query}`)
  
}
export const searchTodayOpening = async (query) => {
  
  return await restaurantPosAxiosInstance.get(
    `searchTodayOpening/${query}`)
  
}
export const searchTodayClosing= async (query) => {
  
  return await restaurantPosAxiosInstance.get(
    `searchTodayClosing/${query}`)
  
}



export const getAllOpeningDateFilter = async ( date) => {
  try {
    return await restaurantPosAxiosInstance.get("getAllOpeningDateFilter", {
      params: { date },
    });
  } catch(err) {
    console.log(err);
  }
};

const fetchExpenseData = async () => {
  
return await restaurantPosAxiosInstance.get(
  `getExpenseData`)
  
}



const PassbookDateFilter = async (data) => {
  try {
    const response = await restaurantPosAxiosInstance.post(
      "passbookDateFilter",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
const TodaysClosingDateFilter = async (data) => {
  try {
    const response = await restaurantPosAxiosInstance.post(
      "TodaysClosingDateFilter",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};


const expenseDateFilter = async (data) => {
  try {
    const response = await restaurantPosAxiosInstance.post(
      "expenseDateFilter",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const TakeAwayData = async () => {
  try {
    const response = await restaurantPosAxiosInstance.get("takeAwayData");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const AddLeads = async (data) => {
  try {
    const response = await restaurantPosAxiosInstance.post("addLeads", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const LeadsData = async () => {
  try {
    const response = await restaurantPosAxiosInstance.get("getLeadsData");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const DeleteLeadData = async (LeadId) => {
  try {
    const response = await restaurantPosAxiosInstance.post("deleteLeadData", {
      LeadId: LeadId,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetToEditLead = async (leadId) => {
  try {
    const response = await restaurantPosAxiosInstance.get(
      `getToEditLead/${leadId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const UpdateLeads = async (leadId, data) => {
  try {
    const response = await restaurantPosAxiosInstance.post(
      `updateLeads/${leadId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const OnlineData = async () => {
  try {
   
    const response = await restaurantPosAxiosInstance.get("onlineData");
console.log(response,"happy respons");

    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetDineInData = async () => {
  try {
    const response = await restaurantPosAxiosInstance.get("getDineIn");
    return response;
  } catch (error) {
    console.log(error);
  }
};


const getEmployeesData= async()=>{
  return await restaurantPosAxiosInstance.get(
    `getAllcustomerDetails`
  );
}

const getEmployeeBill = async () => {
  return await restaurantPosAxiosInstance.get(
    `getAllcustomerBill`
  );
}

const TakeAwayUserToLead = async (data) => {
  try {
    const response = await restaurantPosAxiosInstance.post("takeAwayUserToLead", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};


const HoldItemsAtPos = async (data) => {
  try {
    const response = await restaurantPosAxiosInstance.post(
      "holdItemsAtPos",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  posDashboard,
  KotOrder,
  GetMenuDataAtPos,
  PrintBill,
  // TodayExpense,
  PosExpenseData,
  PassbookDateFilter,
  TakeAwayData,
  AddLeads,
  LeadsData,
  DeleteLeadData,
  GetToEditLead,
  UpdateLeads,
  OnlineData,
  GetDineInData,
  fetchOpeningData,
  fetchExpenseData,
  getEmployeesData,
  getEmployeeBill,
  TodaysClosingDateFilter,
  searchTodaysExpense,
  updateProfileImage,
  fetchTodaysOpeningData,
  fetchTodaysfloatingCash,
  expenseDateFilter,
  TakeAwayUserToLead,
  HoldItemsAtPos
  
};
