

// Sets the base URL for API requests and generates headers, including a 'x-auth-token' for authentication
// and a 'Content-Type' of 'application/json'  for content formatting
export const url = "http://localhost:5001/Api";

export const setHeaders = () => {
  return {
    headers: {
      "x-auth-token": localStorage.getItem("token"), 
      "Content-Type": "application/json",
    },
  };
};
