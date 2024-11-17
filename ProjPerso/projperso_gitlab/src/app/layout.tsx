import React from 'react';
import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'Project Portfolio',
  description: 'A showcase of projects with a dynamic carousel',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Header />
      {children}
      </body>
      </html>
  );
}
