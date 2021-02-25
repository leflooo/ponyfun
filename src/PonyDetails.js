import React from 'react';

class PonyDetails extends React.Component {
    constructor(props) {
      super(props);
      this.state = props.currentContact;
    }
    
    componentWillReceiveProps(nextProps) {
      this.setState(nextProps.currentContact);
    }
    
    handleInputChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    
    newContact(e) {
      e.preventDefault();
      this.props.newContact();
    }
    
    deleteContact(e) {
      e.preventDefault();
      this.props.deleteContact(this.props.currentContact);
    }
    
    addOrUpdateContact(e) {
      e.preventDefault();
      this.props.addOrUpdateContact(this.state);
    }
    
    render() {
      return <div className="detail">
        <div>
          <h3>{this.props.currentContact.id ? 'Kontakt Details' : 'Neuen Kontakt anlegen'}</h3>
          
        </div>

        <form onSubmit={(e) => this.addOrUpdateContact(e)}>
        
          <div className="form-group">
            <label htmlFor="Name">Name:</label>
            <input 
              type="text"
              id="Name"
              name="Name"
              value={this.state.Name} 
              //disabled = {this.state.id}
              onChange={(e) => this.handleInputChange(e)}
              ref={input => input && input.value === "" && input.focus()}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Phone">Tel.Nr.:</label>
            <input 
              type="text"
              id="Phone"
              name="Phone"
              value={this.state.Phone} 
              onChange={(e) => this.handleInputChange(e)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email:</label>
            <input 
              type="text"
              id="Email"
              name="Email"
              value={this.state.Email} 
              onChange={(e) => this.handleInputChange(e)} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="Adresse">Adresse:</label>
            <input 
              type="text"
              id="Adresse"
              name="Adresse"
              value={this.state.Adresse} 
              onChange={(e) => this.handleInputChange(e)} 
            />
          </div>
          <br/>
          <div className="action">
            <input type="submit" className="btn" value={this.props.currentContact.id ? 'Ändern' : 'Speichern'} />
            { this.props.currentContact.id &&
              <button href="#" 
                className="btn" 
                onClick={(e) => this.deleteContact(e)}
              >Löschen</button>
            }
          </div>
          
        </form>
      </div>
    }
  }

  export default PonyDetails;