import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { refreshPageAsync } from './slices/loginSlice';
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Home from './components/Home';
import Main from './components/Main';


function App() {

  const dispatch = useAppDispatch();

  const lightTheme = createTheme({
    type: 'light',
    theme: {
    colors:{'near-gradient(112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%)':true}}, 
  })

  const darkTheme = createTheme({
    type: 'dark',
    theme: {
    colors:{'near-gradient(112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%)':true}}, 
  })

  useEffect(() => {
    dispatch(refreshPageAsync(localStorage.getItem("refresh")||""))
  },[])

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{ light: lightTheme.className, dark: darkTheme.className }}>
      <NextUIProvider>
      <Main/>
      </NextUIProvider>
    </NextThemesProvider>
  );
}


export default App;
