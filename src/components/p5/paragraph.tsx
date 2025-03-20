import React from 'react'
import styled from 'styled-components'

interface ParagraphProps {
  type: 'warning' | 'excercise'
  children: React.ReactNode
}

const TYPE_ICONS = {
  warning: '⚠️',
  excercise: '🏋️'
}

export const Paragraph: React.FC<ParagraphProps> = ({ type, children }) => (
  <Container>
    <Icon>{TYPE_ICONS[type]}</Icon>
    <span>{children}</span>
  </Container>
)

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: fit-content;
  p {
    margin: 5px;
  }
`

const Icon = styled.span`
  font-size: 2em;
  margin: 0 0.5em;
  align-content: center;
`

export const CenteredContainer = styled.div`
  width: 800px;
`

export const SectionBreak = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 15px 0;
  border-top: 1px solid #999;
`
