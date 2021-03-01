import React from 'react';
import './App.scss';
import PonyDetails from './PonyDetails';


class PonyList extends React.Component {
  constructor(props) {
    super(props);
    this.emptyContact = {
      id: '',
      Name: '',
      Email: '',
      Phone: '',
      Adresse: ''
    };
    this.state = {
      contacts: [],
      currentContact: this.emptyContact,
    }
  }

  componentDidMount() {
    this.getContacts();
  }

  selectContact(id) {
    this.setState({
      currentContact: this.state.contacts.filter(c => c.id === id)[0]
    });
  }

  newContact() {
    this.setState({
      currentContact: this.emptyContact
    });
    
  }
  async getContacts() {    
    let Json = await fetch(this.props.config.Url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
    this.setState({
      currentContact: this.emptyContact,
      contacts: Json,
    });      
  }

  async addOrUpdateContact(updatedContact) {
    let method;
    if (updatedContact.id === '') {
      method = 'POST';
    } else {
      method = 'PUT';
    }
    await fetch(this.props.config.Url + "/" + updatedContact.id, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact)
    });
    this.getContacts();
  }

  async deleteContact(contact) {
    await fetch(this.props.config.Url + "/" + contact.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact)
    });
    this.getContacts();
  }

  render() {
    return <div>
      <header>
        <h1>Kontaktbuch!!!</h1>
      </header>

        <main>
          <div className="list">
            {this.state.contacts.length ? '' : 'Keine Einträge gefunden.'}
            <ul>
              {this.state.contacts.map(contact =>
                <li key={contact.id}>
                  <a
                    href="#"
                    onClick={() => this.selectContact(contact.id)}
                    className={this.state.currentContact.id === contact.id ? 'selected' : ''}>
                    <span>{contact.Name}</span>
                  </a>
                </li>
              )}
              <li>
                <a href="#"
                  className="btn"
                  onClick={(e) => this.newContact(e)}
                  ><b>+ Neuen Kontakt anlegen</b>
                </a>
              </li>
            </ul>
          </div>
          <PonyDetails
            currentContact={this.state.currentContact}
            newContact={() => this.newContact()}
            addOrUpdateContact={(contact) => this.addOrUpdateContact(contact)}
            deleteContact={(contact) => this.deleteContact(contact)} />

        </main>
      </div>
  }
}

export default PonyList;