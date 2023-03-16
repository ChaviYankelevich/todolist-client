import axios from 'axios';
import jwt_decode from "jwt-decode";


axios.defaults.baseURL = 'http://localhost:5180';
const STORAGE_KEY = 'access_token';
// const apiUrl = "http://localhost:5180"
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status >= 400) {
      console.log("error");
    }    
    return Promise.reject(error);
  }
);
setAuthorizationBearer();
function saveAccessToken(authResult) {
  console.log(authResult)
  localStorage.setItem(STORAGE_KEY, authResult);
  setAuthorizationBearer();
}

function setAuthorizationBearer() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  console.log(accessToken)
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}
export default {
  getLoginUser: () => {
    const accessToken = localStorage.getItem(STORAGE_KEY);
    if (accessToken) {
      return jwt_decode(accessToken);
    }
    return null;
  },

  logout:()=>{
    localStorage.setItem(STORAGE_KEY, "");
  },

  register: async (name, password) => {
    const user={Name:name,Password:password}
    const res = await axios.post(`${axios.defaults.baseURL}/register`, {
      name: name,
      password: password
    })
    console.log(res.data)
    saveAccessToken(res.data.value);
  },

  login: async (name, password) => {
    const res = await axios.post(`${axios.defaults.baseURL}/login?name=${name}&password=${password}`);
    saveAccessToken(res.data.value);
  },
  getTasks: async () => {
    setAuthorizationBearer()
    const result = await axios.get(`${axios.defaults.baseURL}/getTodos`)  
    return result.data;
  },

  addTask: async(name)=>{
    console.log('addTask', name)
    const todo={Name:name,IsComplete:false}
    const result= await axios.post(`${axios.defaults.baseURL}/addTodo`,todo)
    return result.data;
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    const result=await axios.put(`${axios.defaults.baseURL}/updateTodo/${id}?isComplete=${isComplete}`)
    return result.data
    },

  deleteTask:async(id)=>{
    console.log('deleteTask')
    await axios.delete(`${axios.defaults.baseURL}/deleteTodo/${id}`)
  }
};
