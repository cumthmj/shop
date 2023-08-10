<template>
  <div>
    <el-form :inline="true" :model="userViewData.userQueryParam" class="search-form">
      <el-form-item label="姓名">
        <el-input
          v-model="userViewData.userQueryParam.userName"
          @blur="onSearchUser"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="userViewData.userQueryParam.phoneNumber"
          @blur="onSearchUser"
          placeholder="请输入手机号"
        />
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="userViewData.userQueryParam.roleId" @change="onSearchUser" class="m-2" size="large">
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
        <el-button type="primary" @click="onSearchUser()">查询</el-button>
         <el-button type="primary" @click="addUser()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="userViewData.userList" border style="width: 100%">
      <el-table-column prop="userId" label="用户id" width="190" />
      <el-table-column prop="userName" label="姓名" width="180" />
      <el-table-column prop="phoneNumber" label="手机号" width="180" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="roles" label="用户角色">
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
            @click="handleEditUser(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" prev-text="上一页" next-text="下一页"  @current-change="currentChange"   :page-size="userViewData.userQueryParam.size" :total="userViewData.userQueryParam.total" />
  </div>

  <!-- 编辑用户的弹出窗-->
  <el-dialog v-model="userViewData.editShow" :title="userViewData.title" width="500px">
    <el-form ref="form" :model="userViewData.editUser"  label-width="80px">
      <el-form-item label="姓名" >
        <el-input v-model="userViewData.editUser.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userViewData.editUser.phoneNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userViewData.editUser.email" autocomplete="off" />
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
        <el-button @click="userViewData.editShow = false">取消</el-button>
        <el-button type="primary" @click="ensureEditUser">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {  onMounted, reactive,  ref,  toRefs,  watch } from "vue";
import { add, page,update } from "@/api/user";
import { listAll } from "@/api/role";
import { User, UserViewData, UserQueryParam } from "@/type/user";
import service from "@/request";
import { ElMessage } from "element-plus";

const userViewData=reactive(new UserViewData());

onMounted(() => {
  pageUser(userViewData.userQueryParam); // 获取全部用户数据
  getRoleList(); // 获取全部角色数据
});

 // 当前页改变时触发
    const currentChange = (page: number) => {
      userViewData.userQueryParam.current = page
      pageUser(userViewData.userQueryParam);
    }
// 编辑用户弹窗
const handleEditUser = (row: User) => {
  userViewData.title = "修改"
  userViewData.addOrEdit = 2
  Object.assign(userViewData.editUser,row)
  userViewData.editUser.roleIds = []
  row.roles.forEach(element => {
    userViewData.editUser.roleIds.push(element.roleId)
  });
  console.log(userViewData.editUser)
  userViewData.editShow = true;
};

const ensureEditUser = () => {
  console.log(userViewData.editUser)
  if(userViewData.addOrEdit==1){
    add(userViewData.editUser).then(res=>{
      ElMessage('添加成功！');
      userViewData.editShow=false;
    },err=>{
      ElMessage('添加失败，请重试！');
    }).catch(e=>{
      ElMessage('添加失败，请重试！');
    });
  }else{
    update(userViewData.editUser).then(res=>{
      ElMessage('更新成功！');
      userViewData.editShow=false;
      pageUser(userViewData.userQueryParam);
    },err=>{
      ElMessage('更新失败，请重试！');
    }).catch(e=>{
      ElMessage('更新失败，请重试！');
    });
  }
};

// 获取全部用户数据, 因为多个地方使用,所以封装为方法
const pageUser = (userQueryParam:UserQueryParam) => {
  page(userQueryParam).then((res) => {
      userViewData.userList=res.data.records;
      userViewData.userQueryParam.total=Number(res.data.total)       
      console.log(userViewData.userQueryParam.total)
  });
};

// 获取全部角色数据, 因为多个地方使用,所以封装为方法
const getRoleList = () => {
  listAll().then((res) => {
    userViewData.roles = res.data;
  });
};

// 点击查询用户按钮时触发
const onSearchUser = () => {
  userViewData.userQueryParam.current=0 
  pageUser(userViewData.userQueryParam);
};

/**
 * 新增
 */
function addUser(){
  userViewData.addOrEdit = 1
  userViewData.title = "添加"
  let user:User=new User();
  userViewData.editUser=user;
  userViewData.editShow = true
}

</script>

<style scoped>
.search-form {
  padding: 10px 0 0 10px;
}
</style>