import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'
import '../css/typography.css'

const defaultStyle = css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  body,
  html {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
    font-size: 16px;
    font-family: 'GangwonEdu', -apple-system, BlinkMacSystemFont,
      'Malgun Gothic', '맑은 고딕', helvetica, 'Apple SD Gothic Neo', sans-serif;
  }
  canvas,
  img,
  picture,
  svg,
  video {
    display: block;
    max-width: 100%;
  }
  button,
  input,
  select,
  textarea {
    font: inherit;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    overflow-wrap: break-word;
  }
  #__next,
  #root {
    isolation: isolate;
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
