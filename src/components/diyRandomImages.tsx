'use client'

import { random } from 'lodash'
import React, { useEffect } from 'react'

// import Loadable from "@loadable/component"
import { useFlickrImages } from '../hooks/useFlickrImages'
import { Link, PreviewContainer } from '../pages'

export const DiyRandomImages: React.FC = () => {
  console.log('I get executed in the browser and the client')

  const isSSR = typeof window === 'undefined'
  console.log(isSSR)

  useEffect(() => {
    console.log('I am only being executed in the browser')
  }, [])

  if (isSSR) {
    return <div />
  }
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
                <img src={photo.thumbnailSrc} alt={photo.label} />
              </Link>
            ))}
          </PreviewContainer>
        )
      })}
    </div>
  )
}

// export const LoadableDiyRandomImages = React.lazy(() => DiyRandomImages)
