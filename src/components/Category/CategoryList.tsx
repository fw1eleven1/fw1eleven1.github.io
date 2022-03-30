import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

type CategoryListProps = {
  categoryList: {
    [key: string]: number
  }
}

const CategoryWrapper = styled.div`
  cursor: pointer;
`

const CategoryLIst: FunctionComponent<CategoryListProps> = function ({
  categoryList,
}) {
  return (
    <div>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryWrapper>
          - {name} ({count})
        </CategoryWrapper>
      ))}
    </div>
  )
}

export default CategoryLIst
