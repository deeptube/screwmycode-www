import React from 'react'
import { Redirect } from 'react-router-dom'

export default () => {
  const [route, setRoute] = React.useState(null)

  const inputRef = React.useRef(null)

  // parse the youtube ID from full URL
  const parseId = (url) => {
    const youtubeRegEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(youtubeRegEx)

    if (match && match[2].length === 11) {
      return match[2]
    }
    return 'error'
  }

  // handling form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (parseId(e.target[0].value) !== 'error') {
      e.target[0].blur()
      setRoute(`youtube/${parseId(e.target[0].value)}`)
    } else {
      e.target[0].value = ''
      console.warn('Error: Input URL incorrect.')
    }
  }

  React.useEffect(() => {
    // resetting document title
    document.title = 'screwmycode.in'
    inputRef.current.focus()
  }, [])

  if (route !== null) {
    return (
      <Redirect to={`/${route}`} />
    )
  }

  console.log('Form render')
  return (
    <React.Fragment>
      <form onSubmit={e => handleSubmit(e)}>

        <div className="form">
          <input ref={inputRef} placeholder="insert youtube link here" type="text" />
        </div>

        <div className="form">
          <input type="submit" value="submit" />
        </div>

      </form>
    </React.Fragment>
  )
}
