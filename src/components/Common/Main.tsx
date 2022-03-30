import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import Footer from './Footer'
import GlobalStyle from './GlobalStyle'
import Header from './Header'

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1024px;
  padding: 50px 0 100px;
  margin: 0 auto;
  gap: 20px;
`

const Main: FunctionComponent = function ({ children }) {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </div>
  )
}

export default Main
