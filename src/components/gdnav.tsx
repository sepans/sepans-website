import React from 'react'
import styled from 'styled-components'
import { GdStats } from './gdstats'

interface GdNavProps {
  rideSegIndex: number
  numberOfTracks: number
  setRideSegIndex: (index: number) => void
}

export const GdNav: React.FC<GdNavProps> = (props) => {
  const { rideSegIndex, setRideSegIndex, numberOfTracks } = props

  const hasPrevSeg = () => rideSegIndex >= 0
  const hasNextSeg = () => rideSegIndex !== numberOfTracks - 1

  return (
    <NavContainer>
      <NavButton
        disabled={!hasPrevSeg()}
        type="button"
        onClick={() => setRideSegIndex(rideSegIndex - 1)}
      >
        {'<'}
      </NavButton>
      <StatsDiv>
        <ZoomOutButton
          disabled={rideSegIndex === -1}
          type="button"
          onClick={() => setRideSegIndex(-1)}
        >
          view entire route
        </ZoomOutButton>
        <GdStats rideSegIndex={rideSegIndex} />
      </StatsDiv>
      <NavButton
        disabled={!hasNextSeg()}
        type="button"
        onClick={() => setRideSegIndex(rideSegIndex + 1)}
      >
        {'>'}
      </NavButton>
    </NavContainer>
  )
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`

const NavButton = styled.button`
  border: 2px solid #555;
  background-color: #fff;
  font-size: 1em;
  height: 6em;
  padding: 0 0.75em;
  cursor: pointer;
  :disabled {
    border: 1px solid #aaa;
  }
`

const StatsDiv = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 10px;
`

const ZoomOutButton = styled.button`
  font-family: arial;
  background-color: #fff;
  border: 1px solid #aaa;
  height: 2em;
  font-size: 0.8em;
  cursor: pointer;
  width: 100%;
`
