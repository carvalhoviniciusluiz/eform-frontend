import {
  ThreeDotsIcon,
  DownIcon,
  UpIcon,
  UserIcon,
  MarketIcon
} from '@/presentation/assets'
import { Card } from '@/presentation/components'
import './card-navigation-styles.scss'

const CardNavigation = () => {
  return (
    <Card>
      <div className='profile'>
        <div className='profile__image'>
          <div className='image'>
            <img
              src='https://avatars.githubusercontent.com/u/22005684?v=4'
              alt='avatar'
            />
            <div className='rounded-circle'></div>
          </div>
        </div>
        <div className='profile__details'>
          <div className='box'>
            <div className='box__body'>
              <div className='title'>
                <h1 className='h1'>Vinicius Carvalho</h1>
              </div>
              <div className='info'>
                <a href='#'>Prodap</a>
                <a href='#'>
                  <span className='svg-icon'>
                    <UserIcon />
                  </span>{' '}
                  Software Engineer
                </a>
                <a href='#'>
                  <span className='svg-icon'>
                    <MarketIcon />
                  </span>{' '}
                  carvalho.viniciusluiz@gmail.com
                </a>
              </div>
            </div>
            <div className='box__body'>
              <div className='action'>
                <button>
                  <i>
                    <ThreeDotsIcon size={18} />
                  </i>
                </button>
              </div>
            </div>
          </div>
          <div className='box f-start'>
            <div className='box__info'>
              <div className='value'>
                <UpIcon fill='#b8d935' /> <strong>23</strong>
              </div>
              <div className='description'>accomplished</div>
            </div>
            <div className='box__info'>
              <div className='value'>
                <DownIcon fill='#f06445' />
                <strong>545</strong>
              </div>
              <div className='description'>answered</div>
            </div>
            <div className='box__info'>
              <div className='value'>
                <UpIcon fill='#b8d935' /> <strong>60%</strong>
              </div>
              <div className='description'>year</div>
            </div>
          </div>
        </div>
      </div>
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <a href='#' className='active'>
            Questionnaires
          </a>
        </li>
        <li className='nav-item'>
          <a href='#'>Users</a>
        </li>
        <li className='nav-item'>
          <a href='#'>Settings</a>
        </li>
      </ul>
    </Card>
  )
}

export default CardNavigation
