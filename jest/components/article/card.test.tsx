import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Card from '@/components/article/card';
import { type Article } from '@/api/modules/article';

describe('card component', () => {
  const mockArticle: Article = {
    id: 1,
    type: '技術',
    title: '測試',
    content: '測試',
    tech: '測試',
    user: {
      name: 'Hato',
      checkable: true
    },
    createTime: new Date().toLocaleDateString()
  };

  it('could render', () => {
    render(<Card article={mockArticle} />);
    expect(Card).toMatchSnapshot();
  });

  it('could display as list item', () => {
    render(<Card article={mockArticle} inList={true} />);
    expect(screen.getByRole('link', { name: /完整內容/ })).toBeInTheDocument();
  });

  it('could display as single card', () => {
    render(<Card article={mockArticle} />);
    expect(screen.queryByRole('link', { name: /完整內容/ })).not.toBeInTheDocument();
  });

  it('should display edit btn only when login', async () => {
    render(<Card article={mockArticle} />);

    expect(screen.queryByRole('button', { name: '編輯' })).not.toBeInTheDocument();
  });

  it('could toggle edit mode', async () => {
    const toggle = jest.fn();
    mockArticle.user.id = 'bbb28023-73ba-4e47-842b-b33cca1ee2fa';

    render(<Card article={mockArticle} changeMode={toggle} />);

    const title = screen.getByRole('heading', { name: new RegExp(mockArticle.title) });
    const popoverBtn = within(title.parentElement!).getByRole('button');
    await userEvent.click(popoverBtn);

    await userEvent.click(screen.getByRole('button', { name: '編輯' }));

    expect(toggle).toHaveBeenCalled();
  });
});