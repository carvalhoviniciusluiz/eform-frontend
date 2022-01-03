import Logo from '~/images/logo.png'
import { Accordion, CloseIcon, PlusIcon } from '@/presentation/components'

import './sidebar-styles.scss'

const SideBar = () => {
  return (
    <>
      <input type='checkbox' id='menu-toggle' />

      <label htmlFor='menu-toggle' className='close-mobile-menu'></label>

      <div className='sidebar'>
        <header className='sidebar__header'>
          <div className='brand'>
            <img src={Logo} alt='logo' />
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
              <img
                src='https://avatars.githubusercontent.com/u/22005684?v=4'
                alt='avatar'
              />

              <div className='aside-user-detail'>
                <div className='user-detail'>
                  <div className='user-info'>
                    <strong>Vinicius Carvalho</strong>
                    <span>Software Engineer</span>
                  </div>

                  <a href='#'>
                    <CloseIcon fill='#968e7e' />
                  </a>
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
