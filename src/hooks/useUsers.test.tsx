import { renderHook, waitFor } from '@testing-library/react';
import useUsers from './useUsers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUsers } from '@/store/slices/users/usersSlice';

// Mock fetch function
const mockFetch = jest.fn();

const mockedUseAppDispatch = useAppDispatch as jest.Mock;
const mockedUseAppSelector = useAppSelector as jest.Mock;

// Mock useAppDispatch
jest.mock('@/store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock fetch implementation
global.fetch = mockFetch;

describe('useUsers hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
  });

  it('should fetch users from API and update state', async () => {
    const dispatchMock = jest.fn();
    const usersData = [{ id: '1', name: 'User 1', email: 'user1@example.com' }];
    const responseData = { data: usersData };
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseData),
    });
    mockedUseAppDispatch.mockReturnValueOnce(dispatchMock);
    mockedUseAppSelector.mockReturnValueOnce([]);

    const { result } = renderHook(() => useUsers());

    // Initial state
    expect(result.current.users).toEqual([]);
    expect(result.current.isPending).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      // After fetching users
      expect(result.current.users).toEqual(usersData);
      expect(result.current.isPending).toBe(false);
      expect(result.current.error).toBeNull();
      expect(dispatchMock).toHaveBeenCalledWith(addUsers(usersData));
    })
  });

  it('should handle error while fetching users', async () => {
    const dispatchMock = jest.fn();
    const errorMessage = 'fetchAllUsers fetch catch';
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));
    mockedUseAppDispatch.mockReturnValueOnce(dispatchMock);
    mockedUseAppSelector.mockReturnValueOnce([]);

    const { result } = renderHook(() => useUsers());

    // Initial state
    expect(result.current.users).toEqual([]);
    expect(result.current.isPending).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      // After fetching users
      expect(result.current.users).toEqual([]);
      expect(result.current.isPending).toBe(false);
      expect(result.current.error).toBe(errorMessage);
      expect(dispatchMock).not.toHaveBeenCalled();
    })
  });

  it('should not fetch users if already present in store', async () => {
    const dispatchMock = jest.fn();
    const users = [{ id: '1', name: 'User 1', email: 'user1@example.com' }];
    mockedUseAppDispatch.mockReturnValueOnce(dispatchMock);
    mockedUseAppSelector.mockReturnValueOnce(users);

    const { result } = renderHook(() => useUsers());

    // Initial state
    expect(result.current.users).toEqual(users);
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      // Should not fetch again
      expect(mockFetch).not.toHaveBeenCalled();
      expect(dispatchMock).not.toHaveBeenCalled();
    })
  });
});
