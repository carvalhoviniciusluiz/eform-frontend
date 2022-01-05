import { memo } from 'react'
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

const CodeSkeleton = ({
  speed = 1,
  viewBox = '0 0 340 84',
  backgroundColor = '#F8F6F2',
  foregroundColor = '#B5B0A1',
  ...props
}: IContentLoaderProps) => (
  <ContentLoader
    {...props}
    speed={speed}
    viewBox={viewBox}
    backgroundColor={backgroundColor}
    foregroundColor={foregroundColor}
  >
    <rect x='0' y='0' rx='3' ry='3' width='67' height='8' />
    <rect x='76' y='0' rx='3' ry='3' width='140' height='8' />
    <rect x='127' y='48' rx='3' ry='3' width='53' height='8' />
    <rect x='187' y='48' rx='3' ry='3' width='72' height='8' />
    <rect x='18' y='48' rx='3' ry='3' width='100' height='8' />
    <rect x='0' y='71' rx='3' ry='3' width='37' height='8' />
    <rect x='18' y='23' rx='3' ry='3' width='140' height='8' />
    <rect x='166' y='23' rx='3' ry='3' width='173' height='8' />
  </ContentLoader>
)

export default memo(CodeSkeleton)
