export class Role{
    roleId: string  // 角色id
    roleName: string  // 角色名称
    deleted: number;
}
// 角色接口
export interface IRole{
    role: number,  // 角色id
    roleName: string  // 角色名称
}

// 有权限的角色接口
export interface IRoleWithAuth{
    roleName: string,
    roleId: number,
    authority: []
}

// 展示角色数据
export class RolePages{
    role_list: IRoleWithAuth[] = []
}
// 角色查询参数
export class RoleQueryParam {
    roleName: string;
    roleId: number;
    current: number;
    size: number;
    total: number;
  
    constructor(
      roleName: string,
      roleId: number,
      current: number,
      size: number,
      total: number
    ) {
      this.roleName = roleName;
      this.roleId = roleId;
      this.current = current;
      this.size = size;
      this.total = total;
    }
  }
  // 角色具体展示数据
export class RoleViewData {
    roleQueryParam: RoleQueryParam = {
      roleName: "",
      roleId: 0,
      current: 1,
      size: 5,
      total: 10,
    };
    roles: Role[] = []; // 角色列表
    editShow = false; // 是否显示编辑用户弹出窗
    // 编辑用户时用到的对象
    editRole: Role = {
      roleId: "",
      roleName: "",
      deleted: 0,
    };
    addOrEdit:number=1;
    title:string="添加";
    
  }