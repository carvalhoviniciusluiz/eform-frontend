import Logo from '~/images/logo.png'
import { BrandIcon } from '@/presentation/components'
import './header-styles.scss'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__brand'>
        <img src={Logo} alt='logo' />

        <label htmlFor='menu-toggle' className='menu-toggler'>
          <BrandIcon fill='#968e7e' />
        </label>
      </div>

      <div className='header__toolbar'>
        <div className='page-title'>
          <h1 className='h1'>Dashboard</h1>

          <ul className='breadcrumb'>
            <li className='breadcrumb-item text-muted'>
              <a href='#' className='text-muted text-hover-primary'>
                Home
              </a>
            </li>

            <li className='breadcrumb-item'>
              <span className='bullet'></span>
            </li>

            {/* <li className='breadcrumb-item text-muted'>Account</li>

                <li className='breadcrumb-item'>
                  <span className='bullet'></span>
                </li> */}

            <li className='breadcrumb-item text-dark'>Dashboard</li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
