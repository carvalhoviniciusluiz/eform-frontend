import { FormAsset } from '@/domain'
import './image-group-styles.scss'

type ImageGroupProps = {
  avatars: FormAsset[]
  total: number
}

const ImageGroup = ({ avatars, total }: ImageGroupProps) => {
  return (
    <div className='imageGroup min-w-180px' data-testid='image-group'>
      {avatars.map((avatar, i) => (
        <div className='imageGroup__circle' key={i}>
          {typeof avatar === 'string' ? (
            <img className='image' src={avatar} alt='avatar' />
          ) : (
            <div
              className='imageGroup__noneImage'
              style={{
                backgroundColor: avatar.backgroundColor,
                color: avatar.color
              }}
            >
              <span className='char'>{avatar.char}</span>
            </div>
          )}
        </div>
      ))}

      <div className='imageGroup__circle'>
        <div className='imageGroup__remainingQuantity'>
          <span className='number'>+{total}</span>
        </div>
      </div>
    </div>
  )
}

export default ImageGroup
