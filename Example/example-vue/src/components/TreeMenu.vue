<template>
  <div>
    <template v-for="item in treeData" :key="item.resourceId">
      <el-sub-menu
      :index="item.resourceId"
      v-if="item.children&&item.children.length>0&&item.children[0].resourceType.toString()==='1'">
      <template v-slot:title="title">
         {{item.resourceName}}
      </template>
      <TreeMenu :treeData="item.children"></TreeMenu>
      </el-sub-menu>
      <el-menu-item 
      v-else-if="item.resourceType.toString()==='1'"
      :index="item.path">
      {{item.resourceName}}
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ElSubMenu,ElMenu,ElMenuItem } from 'element-plus';
const props=defineProps({
  treeData:{
    type:Array,
    default:function(){
      return [];
    }
  }
})
</script>

<style scoped>

</style>