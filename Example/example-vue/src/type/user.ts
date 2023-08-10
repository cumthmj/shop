import { Role } from "@/type/role";

// 用户查询参数
export class UserQueryParam {
  phoneNumber: string;
  userName: string;
  roleId: number;
  current: number;
  size: number;
  total: number;

  constructor(
    phoneNumber: string,
    userName: string,
    roleId: number,
    current: number,
    size: number,
    total: number
  ) {
    this.phoneNumber = phoneNumber;
    this.userName = userName;
    this.roleId = roleId;
    this.current = current;
    this.size = size;
    this.total = total;
  }
}
// User类
export class User {
  userId: string;
  phoneNumber: string;
  email: string;
  userName: string;
  pwd: string;
  deleted: number;
  roles: Role[];
  roleIds: string[];
}

// 用户具体展示数据
export class UserViewData {
  // 没有做分页是因为,用户和角色数据往往比较少
  userQueryParam: UserQueryParam = {
    phoneNumber: "",
    userName: "",
    roleId: 0,
    current: 1,
    size: 5,
    total: 10,
  };
  userList: User[] = []; // 用户列表
  roles: Role[] = []; // 角色列表
  editShow = false; // 是否显示编辑用户弹出窗
  // 编辑用户时用到的对象
  editUser: User = {
    userId: "",
    phoneNumber: "",
    email: "",
    userName: "",
    pwd: "",
    deleted: 0,
    roles: [],
    roleIds: [],
  };
  addOrEdit:number=1;
  title:string="添加";
  
}
