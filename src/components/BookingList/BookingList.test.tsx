import { render, screen } from '@testing-library/react';
import BookingList from './BookingList';
import useBookings from '@/hooks/useBookings';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useBookings', () => ({
  __esModule: true,
  default: jest.fn()
}));
const mockedUseBookings = useBookings as jest.Mock;

describe('BookingList', () => {
  test('renders loading message when bookings are pending', () => {
    mockedUseBookings.mockReturnValue({
      bookings: [],
      isPending: true,
      error: null
    });

    render(<BookingList userId="123" />);
    
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders "no booking" message when there are no bookings', () => {
    mockedUseBookings.mockReturnValue({
      bookings: [],
      isPending: false,
      error: null
    });

    render(<BookingList userId="123" />);
    
    const noBookingElement = screen.getByText(/There is no booking for this customer/i);
    expect(noBookingElement).toBeInTheDocument();
  });

  test('renders bookings list when bookings are available', () => {
    const bookings = [
      { id: '1', bookingdate: new Date(), comments: 'Test booking 1' },
      { id: '2', bookingdate: new Date(), comments: 'Test booking 2' }
    ];

    mockedUseBookings.mockReturnValue({
      bookings,
      isPending: false,
      error: null
    });

    render(<BookingList userId="123" />);
    
    const bookingElements = screen.getAllByText(/Booking in a beautiful place/i);
    expect(bookingElements).toHaveLength(bookings.length);
  });
});
