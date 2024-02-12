import { restaurantCapAxiosInstance } from "../apiInterceptor";

const GetCapDashboard = async () => {
  return await restaurantCapAxiosInstance.get("captainDashboard");
};

const getEmployeeBill = async () => {
  return await restaurantCapAxiosInstance.get(`getAllcustomerBillForCaptain`);
};

const getEmployeesData = async () => {
  return await restaurantCapAxiosInstance.get(`getAllcustomerDetailsCap`);
};


export const capDashboard = async (data) => {
  try {
    const response = await restaurantCapAxiosInstance.get("capDashboard", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const BookTable = async (data) => {
  // console.log(data,"i am booked");
  try {

    const response = await restaurantCapAxiosInstance.post(
      "tableBooking",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const TableStatus = async () => {
  try {
    const response = await restaurantCapAxiosInstance.get("getTableStatus");
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const TableDetails = async (tableId) => {
  try {
    const response = await restaurantCapAxiosInstance.get(`TableDetailsByID/${tableId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetMenuDataAtCap = async () => {
  try {
    const response = await restaurantCapAxiosInstance.get("getMenuDataAtCap");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const PrintBillAtCaptain = async (data) => {
  try {
    const response = await restaurantCapAxiosInstance.post(
      "printBillAtCap",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const KotOrder = async (data) => {
  try {
    const response = await restaurantCapAxiosInstance.post(
      "KotOrdersAtCap",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const HoldItems = async (data) => {
  try {
    const response = await restaurantCapAxiosInstance.post(
      "holdItemsAtCap",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const OrderedDataAtCap = async (kotId) => {
  try {
    const response = await restaurantCapAxiosInstance.get(
      `getOrderedDataAtCap/${kotId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const CancelBookTable = async (tableId) => {
  try {
    const response = await restaurantCapAxiosInstance.put(
      `cancelTable/${tableId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const AddLeadsAtCap = async (data) => {
  try {
    const response = await restaurantCapAxiosInstance.post(
      "addLeadsAtCap",
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const LeadsDataAtCap = async () => {
  try {
    const response = await restaurantCapAxiosInstance.get("getLeadsDataAtCap");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const DeleteLeadDataAtCap = async (LeadId) => {
  try {
    const response = await restaurantCapAxiosInstance.post(
      "deleteLeadDataAtCap",
      {
        LeadId: LeadId,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const GetToEditLeadAtCap = async (leadId) => {
  try {
    const response = await restaurantCapAxiosInstance.get(
      `getToEditLeadAtCap/${leadId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const UpdateLeadsAtCap = async (leadId, data) => {
  try {
    const response = await restaurantCapAxiosInstance.post(
      `updateLeadsAtCap/${leadId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  GetCapDashboard,
  BookTable,
  TableStatus,
  GetMenuDataAtCap,
  PrintBillAtCaptain,
  KotOrder,
  HoldItems,
  getEmployeeBill,
  getEmployeesData,
  OrderedDataAtCap,
  CancelBookTable,
  AddLeadsAtCap,
  LeadsDataAtCap,
  DeleteLeadDataAtCap,
  UpdateLeadsAtCap,
  GetToEditLeadAtCap,
};
