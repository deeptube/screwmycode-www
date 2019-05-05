import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

export default function (props) {
  const {
    player, setUrl, setId, setTitle,
  } = props

  const parseId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
      return match[2]
    }
    return 'error'
  }

  const askUrl = (Id) => {
    const url = `http://localhost:5000/youtube/${Id}`
    axios.get(url).then((r) => {
      setTitle(r.data.title)
      setUrl(r.data.url)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (parseId(e.target[0].value) !== 'error' && parseId(e.target[0].value) !== player.id) {
      e.target[0].blur()
      setId(parseId(e.target[0].value))
    } else {
      console.log('Error: Input URL incorrect.')
    }
  }

  React.useEffect(() => {
    if (player.id !== null) {
      askUrl(player.id)
    }
  }, [player.id])

  console.log('Form render')
  return (
    <React.Fragment>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="flex ma0 pa0 bg-transparent">

          <div className="w-50 ml2 ma0 pa0">
            <InputYoutube
              type="text"
              className="w-100 ma0 pa0 b--transparent bg-transparent"
            />
          </div>

          <div className="w-10 ma0 pa0 ml2">
            <InputSubmit
              type="submit"
              value="screw"
              className="w-100 normal input-reset ba b--black-80 bg-transparent pointer f6 dib"
            />
          </div>

        </div>
      </form>
    </React.Fragment>
  )
}

const InputYoutube = styled.input`
  font-size: 1rem;
  padding: 5px 0 5px 2px;
  border-bottom: 1px solid white;
  
  //color: #000411;
  color: white;
  background-color: inherit;

  :hover, :focus {
    background-color: #160c28;
    //color: #efcb68;
    color: white;
  }
`

const InputSubmit = styled.input`
  font-size: 1rem;
  font-weight: 400;
  width: 80px;
  padding: 5px 10px 7px 10px;
  border-radius: 2px;

  border-color: white;
  //color: #000411;
  color: white;
  background-color: inherit;

  :hover {
    background-color: #160c28;
    border-color: #efcb68;
    //color: #efcb68;
    color: white;
  }
`
