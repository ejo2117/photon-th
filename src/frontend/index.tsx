import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PharmacistView from '@components/pharmacist/PharmacistView';
import ProviderView from '@components/provider/ProviderView';
import Login from '@components/login/Login';
import LoggedInRoute from '@components/common/LoggedInRoute';
import { AuthProvider } from '@hooks/useAuth';
import Layout from '@components/common/Layout';
import App from './App';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const rootElement = ReactDOM.createRoot(document.getElementById('appRoot'));
rootElement.render(
	<ChakraProvider>
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<App />} />
					<Route element={<Layout />}>
						<Route
							path='pharmacist'
							element={
								<LoggedInRoute acceptedType='pharmacist'>
									<PharmacistView />
								</LoggedInRoute>
							}
						/>

						<Route
							path='provider'
							element={
								<LoggedInRoute acceptedType='provider'>
									<ProviderView />
								</LoggedInRoute>
							}
						/>
					</Route>
					<Route element={<Layout />}>
						<Route path='/login' element={<Login />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</ChakraProvider>
);
