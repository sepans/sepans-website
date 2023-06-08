/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react'
import styled from 'styled-components'

import Header from './header'
import './layout.css'

export interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <Container>
      <MainArea>{children}</MainArea>
    </Container>
  </>
)

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  margin-bottom: 30px;
  @media (min-width: 768px) {
    max-width: 90%; /* for diy grid */
    padding-left: 80px;
    padding-top: 120px;
  }
`
const MainArea = styled.div`
  flex: 1;
`

export default Layout
