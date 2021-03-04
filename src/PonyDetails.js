import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class PonyDetails extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        props: props.currentContact,
        errors: {
          name: "",
          note: ""
        }
      }
    }
    
    componentWillReceiveProps(nextProps) {
      this.setState(nextProps.currentContact);
    }

    shouldComponentUpdate(nextProps) {
      return true;
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
      if(window.confirm(this.props.currentContact.name +" wirklich löschen?")){
        this.props.deleteContact(this.props.currentContact);
        this.close(e);
      }
    }


    handleValidation(){
      let fields = this.state;
      let errors = {};
      let formIsValid = true;

      //Name
      if(!fields["name"]){
         formIsValid = false;
         errors["name"] = "Bitte ausfüllen!";
      }

 
      //Email
      if(fields["note"].length > 30){
         formIsValid = false;
         errors["note"] = "zu viele Zeichen!";
      }


        this.setState({errors: errors});
        return formIsValid;
    }


    
    addOrUpdateContact(e) {
      e.preventDefault();
      if(this.handleValidation()){
        if(!this.state.outorin)
          this.state.outorin = "0";
        if(!this.state.position)
          this.state.position = "EG";
        this.props.addOrUpdateContact(this.state);
        this.close(e);
      }
    }

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose()
      }
    }
    
    render() {
      if (this.props.isOpen === false)
        return null


      return (<div>
      <div className="detail">
        

        <div className="header">
          <h4>{this.props.currentContact.uid ? 'Pferdedaten' : 'Neues Pferd anlegen'}</h4>
          
          <FontAwesomeIcon onClick={(e) => this.close(e)} className="close" icon={ faTimes } color="grey" transform="grow-6"/>
          
        </div>

        <form onSubmit={(e) => this.addOrUpdateContact(e)}>
        
          <div className="task-input">
            <label htmlFor="name">Name:</label>
            <input 
              type="text"
              id="name"
              name="name"
              value={this.state.name} 
              //disabled = {this.state.id}
              onChange={(e) => this.handleInputChange(e)}
              //ref={input => input && input.value === "" && input.focus()}
            />
            <span style={{color: "red"}}>{this.state.errors["name"]}</span>
          </div>         

          <div className="select-wrapper">
            <label htmlFor="position">Box Standort:</label>

            <select id="position" name="position" value={this.state.position} onChange={(e) => this.handleInputChange(e)}>
              <option value="EG">EG</option>
              <option value="1.Stock">1.Stock</option>
              <option value=" Lisa Stall">Lisa Stall</option>
            </select>
          </div>
          <br/>
          <br/>
          <div className="picker">
            <fieldset>
              <legend>Raus?</legend>

                <label>Ja:</label>
                <input className="task-status" name="outorin" type="radio" value="1" defaultChecked={this.state.outorin === "1"} onChange={(e) => this.handleInputChange(e)}></input>
                <label>Nein:</label>
                <input className="task-status" name="outorin" type="radio" value="2" defaultChecked={this.state.outorin === "2"} onChange={(e) => this.handleInputChange(e)}></input>
                <label>Egal:</label>
                <input className="task-status" name="outorin" type="radio" value="0" defaultChecked={this.state.outorin === "0"} onChange={(e) => this.handleInputChange(e)}></input>
            </fieldset>            
          </div>
          

          <div className="task-input">
            <label htmlFor="note">Notiz:</label>
            <input 
              type="text"
              id="note"
              name="note"
              value={this.state.note} 
              onChange={(e) => this.handleInputChange(e)} 
            />
            <span style={{color: "red"}}>{this.state.errors["note"]}</span>
          </div>
          <div className="task-count">
            <label htmlFor="status">{this.state.status}</label>            
          </div>

          <br/>
          <div className="action picker">
            { this.props.currentContact.uid &&
              <button href="#" 
                className="btn delete" 
                onClick={(e) => this.deleteContact(e)}
              >
                <FontAwesomeIcon icon={ faTrashAlt } transform="grow-4"/>
          
                &nbsp;Löschen
                
                </button>
            }
            <button type="submit" className="btn right save">
            <FontAwesomeIcon icon={ faCheckCircle } transform="grow-4"/>
            &nbsp;Speichern
              </button>
          </div>
          
        </form>
      </div>
      <div className="bg" onClick={e => this.close(e)}/>
      </div>
          )
    }
  }

  export default PonyDetails;