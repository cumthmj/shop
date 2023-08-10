import { Role } from '../type/role';
import service from "@/utils/service"

// 获取所有角色
export function listAll() {
    return service({
        url: "/roles",
        method: "GET"
    })
}

// 用户列表接口
export function page(userQueryParam:Role){
    return service({
        url: "/users",
        method: "POST",
        data:userQueryParam
    })
}

// 用户列表接口
export function getUserList(){
    return service({
        url: "/getUserList",
        method: "GET"
    })
}
