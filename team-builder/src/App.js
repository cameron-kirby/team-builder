import React, { useState } from 'react'
import './App.css';
// Components
import Form from './components/Form'
import Member from './components/Member'

const initialTeamList = [
  {
    username: 'Cameron K',
    email: 'cameronk@lambdastudents.com',
    role: 'Frontend Developer',
  },
]

// 👉 the shape of the state that drives the form
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: '',
  email: '',
  ///// DROPDOWN /////
  role: '',
}

function App() {
  const [team, setTeam] = useState(initialTeamList)
  const [formValues, setFormValues] = useState(initialFormValues)

  const onInputChange = evt => {
    const { name } = evt.target // Pull the target from the event object
    const { value } = evt.target // Pull the value from the event object
    setFormValues({ ...formValues, [name]: value }) // Set new state for the form
  }

  const onSubmit = evt => {
    evt.preventDefault() // Stop browser reload
    // Fail submission if form is incomplete
    if (
      !formValues.username.trim() ||
      !formValues.email.trim() ||
      !formValues.role.trim()
    ) {
      return
    }
    // Update team list
    const newMember = { ...formValues }
    setTeam([ newMember, ...team ])
    // e) optionally clear the form
    setFormValues(initialFormValues)
  }

  return (
    <div className="App">
      <header><h1>Team Builder</h1></header>

      <Form
        values={formValues}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />

      {
        team.map((member, index) => {
          return (
            <Member key={member.index} details={member} />
          )
        })
      }
    </div>
  );
}

export default App;
