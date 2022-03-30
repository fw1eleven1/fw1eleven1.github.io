import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const Top = styled.div`
  border-bottom: 1px solid #6c757d;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1024px;
  height: 80px;
  margin: 0 auto;
`

const Title = styled.div`
  padding: 0 15px;
  font-size: 26px;
  font-weight: 600;
  cursor: pointer;
`

const Header: FunctionComponent = function () {
  return (
    <Top>
      <HeaderWrapper>
        <Title>js의 잡다한 블로그</Title>
      </HeaderWrapper>
    </Top>
  )
}

export default Header
