import React from 'react'

const Header: React.FC<{ includeFonts?: true }> = ({ includeFonts }) => (
  <head>
    {includeFonts && (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </>
    )}
  </head>
)

export default Header
