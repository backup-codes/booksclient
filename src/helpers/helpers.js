import toast from "react-hot-toast";

export function formatCurrency(amount, currencyCode = 'INR') {
    const formatter = new Intl.NumberFormat('en-IN', {
    
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
  
    return formatter.format(amount);
}
  
export function calculateGST(subtotalAmount) {
  // GST rate is 5%
  const gstRate = 0.05;

  // Calculate GST amount
  const gstAmount = subtotalAmount * gstRate;

  // Calculate grand total including GST
  const grandTotal = subtotalAmount + gstAmount;

  const roundedGSTAmount = gstAmount.toFixed(1);
  const roundedGrandTotal = grandTotal.toFixed(1);
  // Return an object containing GST amount and grand total
  return {
      gstAmount: roundedGSTAmount,
      grandTotal: roundedGrandTotal
  };
}


export function generateRandomBillIdWithPrefix(prefix = 'BIPL', length = 7) {

  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix;

  for (let i = prefix.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}


export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
 
   
    hour12: true, // Use 24-hour format
  };

  const date = new Date(dateString);
  const formattedDateTime = date.toLocaleDateString(undefined, options);
  return formattedDateTime;
}

export function floorNumber(number) {
  return Math.floor(number);
}

let isToastVisible = false
export function toastError(message) {
  if (!isToastVisible) {
  
    isToastVisible=true
    const toastId = toast.error(message,{duration:3000});
    const toastDuration =3000
    setTimeout(() => {
   
      isToastVisible=false
    }, toastDuration);
  }
  }
export function toastSuccess(message) {
  if (!isToastVisible) {
 
    isToastVisible=true
    const toastId = toast.success(message,{duration:3000});
    const toastDuration =3000
    setTimeout(() => {
   
      isToastVisible=false
    }, toastDuration);
  }
  }

