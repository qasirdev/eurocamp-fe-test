import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MaterialUiTable from './MaterialUiTable';

const mockPush = jest.fn()

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: (url: string) => mockPush(url)
    })
  }
})

describe('MaterialUiTable', () => {
    beforeEach(() => {
      mockPush.mockClear()
    })
  
  test('renders loading message when no data is provided', () => {
    render(<MaterialUiTable users={[]} />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders table with user data', () => {
    const users = [
      { id: '1', name: 'John', email: 'john@example.com' },
      { id: '2', name: 'Alice', email: 'alice@example.com' }
    ];
    render(<MaterialUiTable users={users} />);
    
    // Check if user data is rendered in the table
    const userId1 = screen.getByText('1');
    expect(userId1).toBeInTheDocument();

    const userName1 = screen.getByText('John');
    expect(userName1).toBeInTheDocument();

    const userEmail1 = screen.getByText('john@example.com');
    expect(userEmail1).toBeInTheDocument();

    const userId2 = screen.getByText('2');
    expect(userId2).toBeInTheDocument();

    const userName2 = screen.getByText('Alice');
    expect(userName2).toBeInTheDocument();

    const userEmail2 = screen.getByText('alice@example.com');
    expect(userEmail2).toBeInTheDocument();
  });

  test('calls handleUserSelect when a user row is clicked', async () => {
    const users = [{ id: '1', name: 'John', email: 'john@example.com' }];
    render(<MaterialUiTable users={users} />);

    const userRow = screen.getByText('John');
    fireEvent.click(userRow);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        `/bookings/?userId=1`,
      )
    })
  });

  test('calls handleUserDelete when delete button is clicked', async () => {
    const users = [{ id: '1', name: 'John', email: 'john@example.com' }];
    render(<MaterialUiTable users={users} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        `/users/1/delete`,
      )
    })
  });
});
