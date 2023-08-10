import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";


//创建axios实例
const service = axios.create({
    baseURL: "http://localhost:9090",
    timeout: 60000, // request timeout超时一分钟
})

//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if(localStorage.getItem("token")){
        config.headers['Authorization'] ="Bearer "+localStorage.getItem("token") || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res) => {
    console.log(res.status)
    const code : number = res.data.code
    if(code != 200){
        return Promise.reject(res.data)
    }
    return res.data
},(err) => {
    if(err.response.status=="401"){
        // console.log("401");
        localStorage.removeItem("token");//删除token
        router.push("/login");//跳转到登录页
    }    
    return Promise.reject(err)
})

export default service