import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

type DescriptionProps = {
  description: string
}

const DescriptionWrapper = styled.div`
  margin-bottom: 15px;
  opacity: 0.8;
`

const Description: FunctionComponent<DescriptionProps> = function ({
  description,
}) {
  return <DescriptionWrapper>{description}</DescriptionWrapper>
}

export default Description
