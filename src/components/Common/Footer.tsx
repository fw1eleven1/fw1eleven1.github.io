import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const FooterWrap = styled.div`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const Footer: FunctionComponent = function () {
  return (
    <FooterWrap>
      js의 잡다한 블로그
      <br />
      Copyright {new Date().getFullYear()} js. all right reserved., <br />
      Powered By Gatsby.
    </FooterWrap>
  )
}

export default Footer
