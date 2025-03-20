/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react'
import styled from 'styled-components'

import Header from './header'
import './styles/common.css'
import './styles/tutorial.css'
import SEO from './seo'

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
      <Container dir={dir}>
        <MainArea>{children}</MainArea>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  padding: 1.5em;
  margin-bottom: 30px;
  @media (min-width: 768px) {
    padding: 3em;
  }
`
const MainArea = styled.div`
  flex: 1;
`

export default Layout
