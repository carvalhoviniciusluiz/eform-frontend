import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CloseIcon, PlusIcon, Logo } from '@/presentation/assets'
import { Accordion } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'
import './sidebar-styles.scss'

const SideBar = () => {
  const handleLogout = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)

  const [state] = useState({
    currentUser: getCurrentAccount().currentUser
  })

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault()
    handleLogout()
  }

  const handleUsername = () => {
    const username = `${state.currentUser.firstName} ${state.currentUser.lastName}`
    return username
  }

  return (
    <>
      <input type='checkbox' id='menu-toggle' />

      <label htmlFor='menu-toggle' className='close-mobile-menu'></label>

      <div className='sidebar'>
        <header className='sidebar__header'>
          <div className='brand'>
            <Logo />
          </div>
        </header>
        <div className='sidebar__content'>
          <div className='body'>
            <div className='aside-toolbar'>
              <a href='#'>
                <PlusIcon fill={'#968e7e'} />
              </a>
            </div>
            <div className='aside-menu'>
              <Accordion title='Questionnaires' isOpen={true}>
                <div className='subMenu'>
                  <div className='subMenu__item'>
                    <a href='#'>Project1</a>
                  </div>
                  <div className='subMenu__item'>
                    <a href='#' className='link-active'>
                      <span className='menu-bullet'>
                        <span className='bullet bullet-dot'></span>
                      </span>
                      Project2
                    </a>
                  </div>
                  <div className='subMenu__item'>
                    <a href='#'>Project3</a>
                  </div>
                  <div className='subMenu__item'>
                    <a href='#'>Project4</a>
                  </div>
                  <div className='subMenu__item'>
                    <a href='#'>Project5</a>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
          <footer className='aside-footer'>
            <div className='aside-user'>
              <img src={state.currentUser.avatar} alt='avatar' />

              <div className='aside-user-detail'>
                <div className='user-detail'>
                  <div className='user-info'>
                    <strong data-testid='username'>{handleUsername()}</strong>
                    <span>Software Engineer</span>
                  </div>

                  <Link data-testid='logout' to='#' onClick={handleClick}>
                    <CloseIcon fill='#968e7e' />
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default SideBar
