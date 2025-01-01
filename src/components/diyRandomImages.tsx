'use client'

import { random } from 'lodash'
import React, { useEffect, useState } from 'react'

import { useFlickrImages } from '../hooks/useFlickrImages'
import { Link, PreviewContainer } from '../pages'

export const DiyRandomImages: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isClientRendering, setIsClientRendering] = useState(false)

  useEffect(() => {
    // re-render images when rendered on client side to randomize
    setIsClientRendering(true)
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
                <img
                  style={{ opacity: isClientRendering ? 1 : 0.2 }}
                  height={150}
                  src={photo.thumbnailSrc}
                  alt={photo.label}
                />
              </Link>
            ))}
          </PreviewContainer>
        )
      })}
    </div>
  )
}
