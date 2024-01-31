import { Component } from 'react'
import { nanoid } from 'nanoid'
import Phonebook from 'components/Phonebook/Phonebook'
import Contacts from 'components/Contacts/Contacts'
import Filter from './Filter/Filter'
import css from './App.module.css'



class App extends Component {

  state = {

    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459125628'},
    {id: 'id-2', name: 'Hermione Kline', number: '443891257'},
    {id: 'id-3', name: 'Eden Clements', number: '645177979'},
    {id: 'id-4', name: 'Annie Copeland', number: '227912635'},
  ],

    // contacts: [],
    filter: '',
    
  }

  handleSubmit = (values, { resetForm }) => {
    
    const contact = { ...values }
    contact.id = nanoid()
    

    if (this.state.contacts.find(contactState => contactState.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase())) {
      alert(`${contact.name} is already in contacts.`)
      return
    }

    this.setState({contacts: [...this.state.contacts, contact]})

    resetForm();

  }

  hendleDelete = (id) => {
    this.setState((prev) => {return {contacts: prev.contacts.filter((contac) =>contac.id !== id)}})
  }

  changeFilter = (evt) => {
        this.setState({ filter: evt.currentTarget.value })
  }


  render() {

    const normslizedFilter = this.state.filter.toLocaleLowerCase()
    const visibileContakt = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normslizedFilter))

  
    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <Phonebook handleSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <Contacts contacts={visibileContakt} hendleDelete={this.hendleDelete} />
        
      </div>

    )
  }

}



export default App

