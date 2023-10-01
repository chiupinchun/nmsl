export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export default {
  list: [
    {
      title: '前端課程',
      href: '/lesson/list'
    }
  ] as NavItem[]
};