import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import CategoryList from 'components/Category/CategoryList'

type CategoriesProps = {
  categories: {
    [key: string]: number
  }
}

const SidebarWrapper = styled.div`
  width: 204px;
`

const Sidebar: FunctionComponent<CategoriesProps> = function ({ categories }) {
  return (
    <SidebarWrapper>
      <CategoryList categories={categories} />
    </SidebarWrapper>
  )
}

export default Sidebar
