
export const url = "http://localhost:5001/Api";

export const setHeaders = () => {
  return {
    headers: {
      "x-auth-token": localStorage.getItem("token"), 
    },
  };
};
