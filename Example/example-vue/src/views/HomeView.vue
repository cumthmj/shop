<template>
  <div class="common-layout">
    <TopNavBar/>
    <div class="main-container">
    <el-menu default-active=""  router>
      <TreeMenu :tree-data="treeData"/>
    </el-menu>
      <div style="flex: 1;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopNavBar from "@/components/TopNavBar.vue";
import TreeMenu from '@/components/TreeMenu.vue';
import { onMounted, ref } from "vue";
import {resources} from  "@/api/user";

const treeData =ref([])
onMounted(() => {
  resources().then(res=>{
    console.log(res)
  treeData.value=res.data
  });
})
</script>

<style lang="scss">
  .main-container{
    display: flex;
    ul{
        width: 150px;
    }
  }
</style>
