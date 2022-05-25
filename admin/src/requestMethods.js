import axios from "axios";

const BASE_URL = "http://localhost:8080/";

const TOKEN = ()=>{
  let token = "";
  if (localStorage.getItem("persist:root"))
  token = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
    .currentUser?.accessToken;
    console.log("TOKEN()",token);
  return token

}
// let TOKEN = "" ;
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6IjYyMWQzMzM3Mjk0NGMxNTBkOTE2ZjE3ZiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjUwMjM4NjgwLCJleHAiOjE2ODE3NzQ2ODB9.wRhSqwIQUDaBUaDIXK76BBy8NKPnH771Gsr1nsu8MBw";
// if (localStorage.getItem("persist:root"))
//   TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
//     .currentUser?.accessToken;

console.log("TOKEN", TOKEN);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN()}` },
});

export const request = axios.create({
  baseURL: BASE_URL,
});