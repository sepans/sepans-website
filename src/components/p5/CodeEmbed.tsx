/*
  Mostly of the code was taken from p5.js website and changed it to work with gatsby/react/styled components
  credit: p5.js authors

  This component is used to embed p5.js code snippets in the p5.js editor.
  It includes a code editor and a preview of the sketch.
  It also includes buttons to run, stop, copy, and reset the code.
*/
import React, { useState, useEffect, useRef } from 'react'
import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

import styled from 'styled-components'
import { CodeFrame } from './frame'
import { CopyCodeButton } from './copyCodeButton'
import { Icon } from './icon'

interface CodeEmbedProps {
  initialValue?: string
  editable: boolean
  previewable: boolean
  previewHeight?: number
  previewWidth?: number
  base?: string
  lazyLoad?: boolean
  // allowSideBySide?: boolean
  fullWidth?: boolean
  includeSound?: boolean
  showCode?: boolean
}

// TODO: setup
export const cdnLibraryUrl =
  'https://cdn.jsdelivr.net/npm/p5@1.11.3/lib/p5.min.js'
export const cdnSoundUrl = ''

export const CodeEmbed: React.FC<CodeEmbedProps> = ({
  initialValue,
  ...props
}) => {
  const [rendered, setRendered] = useState(false)
  const initialCode = initialValue ?? ''

  // Source code from Google Docs sometimes uses a unicode non-breaking space
  // instead of a normal one, but these break the code frame, so we replace them here.
  // We also replace them in CodeFrame, but replacing here too ensures people don't
  // accidentally copy-and-paste them out of the embedded editor.
  const [codeString, setCodeString] = useState(
    initialCode.replace(/\u00A0/g, ' ')
  )

  let { previewWidth, previewHeight } = props
  const { showCode, fullWidth } = props
  const canvasMatch =
    /createCanvas\(\s*(\d+),\s*(\d+)\s*(?:,\s*(?:P2D|WEBGL)\s*)?\)/m.exec(
      initialCode
    )
  if (canvasMatch) {
    previewWidth = previewWidth || parseFloat(canvasMatch[1])
    previewHeight = previewHeight || parseFloat(canvasMatch[2])
  }

  // const largeSketch = previewWidth && previewWidth > 770 - 60

  // Quick hack to make room for DOM that gets added below the canvas by default
  const domMatch = /create(Button|Select|P|Div|Input|ColorPicker)/.exec(
    initialCode
  )
  if (domMatch && previewHeight) {
    previewHeight += 100
  }

  const codeFrameRef = useRef(null)

  const updateOrReRun = () => {
    if (codeString === previewCodeString) {
      setPreviewCodeString('')
      requestAnimationFrame(() => setPreviewCodeString(codeString))
    } else {
      setPreviewCodeString(codeString)
    }
  }

  const [previewCodeString, setPreviewCodeString] = useState(codeString)

  useEffect(() => {
    setRendered(true)

    // Includes p5.min.js script to be used by `CodeFrame` iframe(s)
    const p5ScriptElement = document.createElement('script')
    p5ScriptElement.id = 'p5ScriptTag'
    p5ScriptElement.src = cdnLibraryUrl
    document.head.appendChild(p5ScriptElement)
  }, [])

  if (!rendered) return <div className="code-placeholder" />

  return (
    <Container showCode={showCode} fullWidth={fullWidth}>
      {props.previewable ? (
        <Preview>
          <div>
            <CodeFrame
              jsCode={previewCodeString}
              width={previewWidth}
              height={previewHeight}
              base={props.base}
              frameRef={codeFrameRef}
              lazyLoad={props.lazyLoad}
              scripts={props.includeSound ? [cdnSoundUrl] : []}
            />
          </div>
        </Preview>
      ) : null}
      {showCode && (
        <CodeContainer>
          <CodeMirror
            value={codeString}
            theme="light"
            width="100%"
            basicSetup={{
              highlightSpecialChars: false,
              history: false,
              drawSelection: true,
              syntaxHighlighting: true,
              defaultKeymap: true,
              historyKeymap: true,
              lineNumbers: false,
              foldGutter: false,
              autocompletion: false
            }}
            indentWithTab={false}
            extensions={[javascript(), EditorView.lineWrapping]}
            onChange={(val) => setCodeString(val)}
            editable={props.editable}
            onCreateEditor={(editorView) => {
              // FIXME:
              // eslint-disable-next-line no-param-reassign
              editorView.contentDOM.ariaLabel = 'Code Editor'
            }}
          />
          <CopyButtons>
            <CircleButton onClick={updateOrReRun} aria-label="Run sketch">
              <Icon kind="play" />
            </CircleButton>
            <CircleButton
              onClick={() => {
                setPreviewCodeString('')
              }}
              aria-label="Stop sketch"
            >
              <Icon kind="stop" />
            </CircleButton>
            <CopyCodeButton textToCopy={codeString || initialCode} />
            <CircleButton
              onClick={() => {
                setCodeString(initialCode)
                setPreviewCodeString(initialCode)
              }}
              aria-label="Reset code to initial value"
              className="bg-white text-black"
            >
              <Icon kind="refresh" />
            </CircleButton>
          </CopyButtons>
        </CodeContainer>
      )}
    </Container>
  )
}

const Container = styled.div<{
  fullWidth?: boolean
  allowSideBySide?: boolean
  showCode: boolean
}>`
  direction: ltr;
  display: flex;
  flex-direction: ${(p) => (p.allowSideBySide ? `row` : 'column')};
  gap: 10px;
  overflow: hidden;
  max-width: 950px;
  width: 100%;
  ${(p) => (p.fullWidth ? 'width: 100%;' : '')}
  ${(p) => (p.showCode ? '' : 'width: fit-content; margin: 0 auto;')}
  @media (min-width: 950px) {
    flex-direction: row;
  }
`

/* className={`ml-0 flex w-fit gap-[20px] ${largeSketch ? "flex-col" : (props.allowSideBySide ? "" : "flex-col lg:flex-row")}`} */

const Preview = styled.div`
  margin-left: 0;
  gap: 10px;
  width: fit-content;
  display: flex;
  flex-direction: column;
`

const CopyButtons = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const CodeContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 5px;
`

export const CircleButton = styled.button`
  font-size: 1.2em;
  padding: 5px 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid #aaa;
  background-color: #eee;
  cursor: pointer;
  &:hover {
    border: 1px solid #555;
  }
`

export default CodeEmbed
