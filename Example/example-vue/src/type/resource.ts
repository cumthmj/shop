// 资源接口
export interface IResource{
    resourceId: string,  //资源id
    resourceName: string  //资源名称
    resourceType:string,//资源类型
    path:string, //资源路径
    children:IResource[] //子项
}
