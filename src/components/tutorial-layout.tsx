import * as React from 'react'
import styled from 'styled-components'

import Header from './header'
import './styles/common.css'
import './styles/tutorial.css'
import SEO from './seo'

import 'vazirmatn/Vazirmatn-Variable-font-face.css'

export interface LayoutProps {
  children: React.ReactNode
  dir?: string
  meta?: []
}

// TODO: query meta from mdx headers?
const Layout: React.FC<LayoutProps> = (props) => {
  const { meta, children, dir } = props
  return (
    <>
      <Header />
      <SEO meta={meta} />
      <Container dir={dir}>{children}</Container>
    </>
  )
}

const Container = styled.div`
  padding: 1.5em;
  @media (min-width: 768px) {
    width: 100%;
    max-width: 1100px;
    padding: 3em;
    margin: 0 auto;
  }
`

export default Layout
