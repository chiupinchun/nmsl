import type { FormCol } from "@/types/form";

export default [
  {
    text: '標題',
    model: 'title',
  },
  {
    text: '內文',
    model: 'content',
    type: 'markdown'
  }
] as FormCol[];