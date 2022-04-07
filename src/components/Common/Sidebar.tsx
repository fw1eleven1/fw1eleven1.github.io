import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import CategoryList from 'components/Category/CategoryList'

type CategoriesProps = {
  selectedCategory: string
  categories: {
    [key: string]: number
  }
}

const SidebarWrapper = styled.div`
  max-width: 180px;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`

const Sidebar: FunctionComponent<CategoriesProps> = function ({
  selectedCategory,
  categories,
}) {
  return (
    <SidebarWrapper>
      <CategoryList
        selectedCategory={selectedCategory}
        categories={categories}
      />
    </SidebarWrapper>
  )
}

export default Sidebar
