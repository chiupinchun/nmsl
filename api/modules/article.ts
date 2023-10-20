import { request } from "../core";
import { UserInfo } from "./user";

export const typeOptions = ['技術', '發問', '徵才'] as const;

export const postArticle = (payload: {
  title: string;
  type: string;
  content: string;
}) => {
  return request('/article', {
    method: 'POST',
    body: payload
  });
};

interface Article {
  id: number;
  title: string;
  content: string;
  user: Partial<UserInfo>;
  createTime: string;
}
export const getArticles = () => {
  return request<Article[]>('/article');
};

interface Comment {

}
interface ArticleWithComment extends Article {
  comment: Comment[];
}
export const getArticle = (id: string) => {
  return request<ArticleWithComment>('/article/' + id);
};