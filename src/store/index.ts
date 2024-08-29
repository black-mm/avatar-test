import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStore = defineStore("store", () => {
  // 头像形状
  type shape = 'circle'|'square'|'squircle'
  let avatarShape  = ref<shape>('squircle')
  // 头像边框
  let avatarBorder = ref('transparent')

  // 头像属性集合
  let svgOptions: {
    [key: string]: number | string;
  } = {
    mounth: "",
    ear: "",
  }
  // 更改头像的属性
  function changeSvgOptions(type:string,svgValue:string) {
    svgOptions[type]= svgValue
  }
  return {
    avatarShape,
    avatarBorder,
    svgOptions,
    changeSvgOptions,
  }
})
