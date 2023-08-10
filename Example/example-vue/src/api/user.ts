import { User, UserQueryParam } from './../type/user';
import service from "@/utils/service";
import {LoginData} from "@/type/login";

// 登录接口
export function login(data: LoginData) {
    return service({
        url: "/auth/login",
        method: "POST",
        data
    })
}

// 获取用户的资源
export function resources(){
    return service({
        url: "/users/current/resources",
        method: "GET"
    })
}

// 用户列表接口
export function page(userQueryParam:UserQueryParam){
    return service({
        url: "/users/page",
        method: "POST",
        data:userQueryParam
    })
}

// 用户列表接口
export function add(user:User){
    return service({
        url: "/users",
        method: "POST",
        data:user
    })
}

// 用户列表接口
export function update(user:User){
    return service({
        url: "/users",
        method: "PUT",
        data:user
    })
}
