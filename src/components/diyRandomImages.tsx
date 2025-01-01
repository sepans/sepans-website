'use client'

import { random } from 'lodash'
import React, { useEffect, useState } from 'react'

import { useFlickrImages } from '../hooks/useFlickrImages'
import { Link, PreviewContainer } from '../pages'

export const DiyRandomImages: React.FC = () => {
  const isSSR = typeof window === 'undefined'

  const [isClientRendered, setIsClientRendered] = useState(false)

  useEffect(() => {
    console.log('client rendering', isSSR)
    setIsClientRendered(true)
  }, [])

  const { photoGroups } = useFlickrImages()

  const groupsSize = Object.keys(photoGroups).length
  const groupsToPick = 6
  const start = random(0, groupsSize - groupsToPick)
  const randomGroups = Object.entries(photoGroups).slice(
    start,
    start + groupsToPick
  )

  return (
    <div>
      {randomGroups.map(([label, group]) => {
        const randomIndex = random(0, group.length - 1)
        return (
          <PreviewContainer key={`group-${label}`} title={label}>
            {group.slice(randomIndex, randomIndex + 1).map((photo) => (
              <Link href="content/diy">
                {/* don't bother rendering images when it is server side */}
                {isClientRendered ? (
                  <img
                    height={150}
                    src={photo.thumbnailSrc}
                    alt={photo.label}
                  />
                ) : (
                  <div>blah</div>
                )}
              </Link>
            ))}
          </PreviewContainer>
        )
      })}
    </div>
  )
}
