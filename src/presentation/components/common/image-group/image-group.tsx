import './image-group-styles.scss'

type El = {
  char: string
  color: string
  backgroundColor: string
}

type Asset = El | string

type ImageGroupProps = {
  assets: Asset[]
  count: number
}

const ImageGroup = (props: ImageGroupProps) => {
  const { assets, count } = props

  return (
    <div className='imageGroup min-w-180px'>
      {assets.map((asset, i) => (
        <div className='imageGroup__circle' key={i}>
          {typeof asset === 'string' ? (
            <img className='image' src={asset} alt='avatar' />
          ) : (
            <div
              className='imageGroup__noneImage'
              style={{
                backgroundColor: asset.backgroundColor,
                color: asset.color
              }}
            >
              <span className='char'>{asset.char}</span>
            </div>
          )}
        </div>
      ))}

      <div className='imageGroup__circle'>
        <div className='imageGroup__remainingQuantity'>
          <span className='number'>+{count}</span>
        </div>
      </div>
    </div>
  )
}

export default ImageGroup
