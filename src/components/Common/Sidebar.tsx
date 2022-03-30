import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import CategoryLIst from 'components/Category/CategoryList'

const TEMP_CATEGORIES = {
  LIFE: 5,
  IT: 10,
  GAME: 100,
}

const SidebarWrapper = styled.div`
  width: 204px;
`

const Sidebar: FunctionComponent = function () {
  return (
    <SidebarWrapper>
      <CategoryLIst categoryList={TEMP_CATEGORIES} />
    </SidebarWrapper>
  )
}

export default Sidebar
