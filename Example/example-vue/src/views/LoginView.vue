<template>
  <div class="login">
    <div class="form-cls">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="70px"
      >
        <h2>后台管理系统</h2>
        <el-form-item label="手机号:" prop="phoneNumber">
          <el-input
            v-model="loginForm.phoneNumber"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="密码:" prop="pwd">
          <el-input
            v-model="loginForm.pwd"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm(loginFormRef)"
            >登录</el-button
          >
          <el-button class="login-btn" @click="resetForm(loginFormRef)"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginData } from "@/type/login";
import { FormInstance } from "element-plus";
import { login } from "@/api/user";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";


const loginForm = reactive(new LoginData());

const router = useRouter(); //-->$router

// 表单输入规则
const rules = {
  phoneNumber: [
    {
      required: true, //是否必须字段
      message: "请输入用户名", // 触发的提示信息
      trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
    },
    {
      min: 11, // 最小字符书
      max: 11, // 最大字符数
      message: "手机号必须为11位", // 触发的提示信息
      trigger: "blur",
    },
  ],
  pwd: [
    {
      required: true, //是否必须字段
      message: "请输入密码", // 触发的提示信息
      trigger: "blur", // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
    },
    {
      min: 6, // 最小字符书
      max: 20, // 最大字符数
      message: "密码长度需要在6-20个字符之间", // 触发的提示信息
      trigger: "blur",
    },
  ],
};

// 登录
const loginFormRef = ref<FormInstance>();

// 重置
const resetForm = () => {
  loginForm.phoneNumber = "";
  loginForm.pwd = "";
};

const submitForm = (formEl: FormInstance | undefined) => {
  // 对表单内容进行验证
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login(loginForm).then((res) => {
        console.log(res);
        // 将token进行保存
        localStorage.setItem("token", res.data.token);
        // 跳转页面
        router.push("/");
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/bg.jpg");
}

.form-cls {
  padding: 50px;
  width: 400px;
  margin: 0 auto;
  background-color: white;
  position: relative;
  top: 200px;
  border-radius: 4px;
}

.login-btn {
  width: 48%;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>