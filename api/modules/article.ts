import { request } from "../core";
import { UserInfo } from "./user";

export const typeOptions = ['技術', '發問', '徵才', '隨筆'] as const;
export const techOptions = ['前端', '後端', '全端', '爬蟲', 'AI', '區塊鏈', '算法', '運維', '網安', '測試'] as const;

export interface PostArticlePayload {
  title: string;
  type: typeof typeOptions[number];
  content: string;
  tech?: typeof techOptions[number];
}
export const postArticle = (payload: PostArticlePayload) => {
  return request('/article', {
    method: 'POST',
    body: payload
  });
};
export const editArticle = (id: number, payload: PostArticlePayload) => {
  return request(`/article/${id}`, {
    method: 'PATCH',
    body: payload
  });
};
export const deleteArticle = (id: number) => {
  return request(`/article/${id}`, {
    method: 'DELETE'
  });
};

export interface Article {
  id: number;
  type: typeof typeOptions[number];
  title: string;
  content: string;
  tech: typeof techOptions[number];
  user: Partial<UserInfo>;
  createTime: string;
}
export const getArticles = (payload: {
  type?: typeof typeOptions[number];
  tech?: typeof techOptions[number];
  user?: string;
  show?: string;
} = {}) => {
  return request<Article[]>('/article', {
    query: payload
  });
};

export interface Comment {
  id: number;
  content: string;
  user: {
    id: string;
    name: string;
  };
  createTime: string;
}
interface ArticleWithComment extends Article {
  comments: Comment[];
}
export const getArticleById = (id: string, cache?: boolean) => {
  return request<ArticleWithComment>('/article/' + id, { next: { revalidate: cache ? 60 * 60 : 0 } });
};
