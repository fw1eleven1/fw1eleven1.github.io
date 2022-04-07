import React, { FunctionComponent, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import CategoryList from 'components/Category/CategoryList'

type CategoriesProps = {
  selectedCategory: string
  categories: {
    [key: string]: number
  }
}

const Top = styled.div`
  border-bottom: 1px solid #6c757d;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 1024px;
  height: 80px;
  margin: 0 auto;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: 50px;
  }
`

const Title = styled(Link)`
  padding: 0 15px;
  font-size: 26px;
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 1024px) {
    padding: 0 30px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: 5px;
    padding: 0 40px;
  }
`

const MenuIcon = styled(FontAwesomeIcon)`
  display: none;
  font-size: 20px;

  @media (max-width: 768px) {
    display: block;
    padding: 0 20px;
  }
`
const MenuBackground = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: -1;
  transition: z-index ease 0.3s;

  &.show {
    z-index: 10;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`
const Menu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-color: #fff;
  z-index: 100;
  border: 1px solid #ddd;
  padding: 0 20px 40px;
  transition: all ease 0.3s;
  transform: translateX(200px);

  &.show {
    transform: translateX(0);
  }
`

const MenuCloseIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
`

const CloseIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
`

const Header: FunctionComponent<CategoriesProps> = function ({
  selectedCategory,
  categories,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const onClickMenu = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const onClickCloseMenu = useCallback(e => {
    if (e.target.classList.contains('menu')) {
      return
    }

    setIsOpen(false)
  }, [])

  return (
    <>
      <Top>
        <HeaderWrapper>
          <Title to={'/'}>js의 잡다한 블로그</Title>
          <MenuIcon icon={faBars} onClick={onClickMenu} />
        </HeaderWrapper>
      </Top>
      <MenuBackground
        onClick={e => onClickCloseMenu(e)}
        className={isOpen ? `show` : ''}
      >
        <Menu className={'menu ' + (isOpen ? 'show' : '')}>
          <MenuCloseIconWrapper>
            <CloseIcon icon={faXmark} onClick={e => onClickCloseMenu(e)} />
          </MenuCloseIconWrapper>
          <CategoryList
            selectedCategory={selectedCategory}
            categories={categories}
          />
        </Menu>
      </MenuBackground>
    </>
  )
}

export default Header
