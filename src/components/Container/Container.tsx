'use client';
import { setupStore } from '@/store/store'
import { Provider } from 'react-redux'

const store = setupStore()

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return ( 
    <div>
      <Provider store={store}>
        {children}
      </Provider>
    </div>
   );
}
 
export default Container;
