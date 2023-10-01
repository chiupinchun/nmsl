import type { FormCol } from "@/types/form";

export default [
  {
    text: '所屬合集',
    model: 'series',
  },
  {
    text: '講師姓名',
    model: 'author',
  },
  {
    text: '標題',
    model: 'title',
  },
  {
    text: '內文',
    model: 'content',
    type: 'markdown'
  },
  {
    text: '影片連結',
    model: 'src',
  },
  {
    text: 'tags',
    model: 'tags',
    placeholder: '使用逗號連接'
  },
  {
    text: '權重',
    model: 'weight',
    type: 'number'
  }
] as FormCol[];