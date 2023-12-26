jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn
    };
  },
}));

jest.mock("@/store", () => ({
  useSelector(selector: Function) {
    const state = {
      user: {
        "createTime": "2023-09-30T08:31:52.000Z",
        "id": "bbb28023-73ba-4e47-842b-b33cca1ee2fa",
        "account": "hatotest",
        "name": "Hato",
        "avatar": "",
        "sex": "男",
        "contract": "fansintuesan@gmail.com",
        "adress": "台北市",
        "position": "1111人力銀行／工程主任",
        "field": "網頁前端",
        "techs": "TypeScript,Nuxt,Next.js,NestJS",
        "description": "2022年8月從前端工程師培訓機構結訓。 \n2022年9月於1111人力銀行任職前端工程師。\n2023年8月升為主任。\n學過一點前端框架源碼，精通Nuxt、Vue、Next、React、Nest、TypeScript的單詞拼寫。",
        "checkable": true,
        "activity": 3,
        "testing": false
      }
    };
    return selector(state);
  }
}));