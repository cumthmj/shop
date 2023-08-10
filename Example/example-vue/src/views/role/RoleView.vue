<template>
  <div>角色管理
    <el-table :data="RoleViewData.roles" border style="width: 100%">
  <el-table-column prop="roleId" label="角色id" width="190" />
  <el-table-column prop="roleName" label="角色名称">
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
  <el-dialog v-model="RoleViewData.editShow" :title="RoleViewData.title" width="500px">
    <el-form ref="form" :model="userViewData.editUser"  label-width="80px">
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
        <el-button @click="userViewData.editShow = false">取消</el-button>
        <el-button type="primary" @click="ensureEditUser">修改</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
<script setup lang="ts">
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

</script>

<style scoped>

</style>