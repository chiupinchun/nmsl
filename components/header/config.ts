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
    },
    {
      title: '許願池',
      href: '/fountain'
    }
  ] as NavItem[]
};