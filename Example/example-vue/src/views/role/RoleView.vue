<template>
  <div>角色管理
    <el-form :inline="true" :model="userViewData.userQueryParam" class="search-form">
      <el-form-item label="姓名">
        <el-input
          v-model="userViewData.userQueryParam.userName"
          @blur="onSearchRole"
          placeholder="请输入姓名"
        />
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="userViewData.userQueryParam.roleId" @change="onSearchRole" class="m-2" size="large">
          <el-option :key="0" label="全部" :value="0" />
          <el-option
            v-for="role in userViewData.roles"
            :key="role.roleId"
            :label="role.roleName"
            :value="role.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchRole()">查询</el-button>
         <el-button type="primary" @click="addRole()">添加</el-button>
      </el-form-item>
      </el-form>
    <el-table :data="userViewData.roles" border style="width: 100%">
  <el-table-column prop="roleId" label="角色id" width="190" />
  <el-table-column prop="rolename" label="角色名称">
    <template #default="scope">
      <el-button
        link
        type="primary"
        size="small"
        v-for="item in scope.row.roles"
        :key="item.role"
      >
        {{ item.roleName }}
      </el-button>
    </template>
  </el-table-column>
  <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleEditRole(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
   
  <!-- 编辑角色的弹出窗-->
  <el-dialog v-model="roleViewData.editShow" :title="roleViewData.title" width="500px">
    <el-form ref="form" :model="roleViewData.editRole"  label-width="80px">
      <el-form-item label="姓名" >
        <el-input v-model="userViewData.editUser.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select 
        style="width:100%"
          multiple
          v-model="userViewData.editUser.roleIds"
          size="large"
          placeholder="请选择角色"
        >
          <el-option
            v-for="role in userViewData.roles"
            :key="role.roleId"
            :label="role.roleName"
            :value="role.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="roleViewData.editShow = false">取消</el-button>
        <el-button type="primary" @click="ensureEditRole">修改</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>



<script setup lang="ts">
import {  onMounted, reactive } from "vue";
import { add, page,update } from "@/api/user";
import { listAll } from "@/api/role";
import { Role, RolePages, RoleQueryParam,RoleViewData} from "@/type/role";
import { User, UserViewData, UserQueryParam } from "@/type/user";
//import service from "@/request";
import { ElMessage } from "element-plus";
import service from "@/request";

const userViewData=reactive(new UserViewData());
const roleViewData=reactive(new RoleViewData());

onMounted(() => {
  pageUser(userViewData.userQueryParam); // 获取全部用户数据
  getRoleList(); // 获取全部角色数据
});
//获取全部角色数据, 因为多个地方使用,所以封装为方法
const getRoleList = () => {
  listAll().then((res) => {
    userViewData.roles = res.data;
  });
}; 
// 获取全部用户数据, 因为多个地方使用,所以封装为方法
const pageUser = (userQueryParam:UserQueryParam) => {
  page(userQueryParam).then((res) => {
      userViewData.userList=res.data.records;
      userViewData.userQueryParam.total=Number(res.data.total)       
      console.log(userViewData.userQueryParam.total)
  });
};

// 更新或修改状态
const ensureEditRole = () => {
  console.log(userViewData.editUser)
  if(roleViewData.addOrEdit==1){
    add(userViewData.editUser).then(res=>{
      ElMessage('添加成功！');
      roleViewData.editShow=false;
    },err=>{
      ElMessage('添加失败，请重试！');
    }).catch(e=>{
      ElMessage('添加失败，请重试！');
    });
  }else{
    update(userViewData.editUser).then(res=>{
      ElMessage('更新成功！');
      roleViewData.editShow=false;
      pageUser(userViewData.userQueryParam);
    },err=>{
      ElMessage('更新失败，请重试！');
    }).catch(e=>{
      ElMessage('更新失败，请重试！');
    });
  }
};
// 点击查询用户按钮时触发
const onSearchRole = () => {
  userViewData.userQueryParam.current=0 
  pageUser(userViewData.userQueryParam);
};

/**
 * 新增
 */
function addRole(){
  roleViewData.addOrEdit = 1
  roleViewData.title = "添加"
  let role:Role=new Role();
  roleViewData.editRole=role;
  roleViewData.editShow = true
}
// 编辑用户弹窗
const handleEditRole = (row: User) => {
  roleViewData.title = "修改"
  roleViewData.addOrEdit = 2
  Object.assign(userViewData.editUser,row)
  userViewData.editUser.roleIds = []
  row.roles.forEach(element => {
    userViewData.editUser.roleIds.push(element.roleId)
  });
  console.log(userViewData.editUser)
  userViewData.editShow = true;
};

</script>

<style scoped>

</style>