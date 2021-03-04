import React from 'react';
import './App.scss';
import PonyDetails from './PonyDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusCircle, faSort } from '@fortawesome/free-solid-svg-icons'


class PonyList extends React.Component {
  intervalID;
  constructor(props) {
    super(props);
    this.emptyContact = {
      uid: '',
      name: '',
      position: '',
      outorin: 0,
      status: '',
      note: '',
      img: ''

    };
    this.state = {
      contacts: [],
      currentContact: this.emptyContact,
      isModalOpen: false,
      filter: ["0", "1", "2"],
      sortby: "outorin",
    }
  }

  componentDidMount() {
    this.getContacts();
  }

  componentWillUnmount() {
    
    clearTimeout(this.intervalID);
  }

  selectContact(uid) {   
    
    this.setState({
      currentContact: this.state.contacts.filter(c => c.uid === uid)[0],
      isModalOpen: true
    });

  }

  openModal() {
    clearTimeout(this.intervalID);
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
    this.getContacts();
  }

  newContact() {
    this.setState({
      currentContact: this.emptyContact,
      isModalOpen: true
    });
    
  }
  
  sm = 1; //sortMultiplyer

  sortinga(a , b){    
    if(this.state.sortby === "outorin"){
      if(a.outorin > b.outorin)
      return 1 * this.sm;
      else
      return -1 * this.sm;
    }
    if(this.state.sortby === "position"){
      if(a.position.localeCompare(b.position) < 1)
      return 1 *this.sm;
      else
      return -1 * this.sm;
    }
  }

  changeSort(e, x){
    if(this.state.sortby === x){
      this.sm = this.sm * -1;
    }    
      this.setState({        
        sortby: x
      }); 
  }


  filter(e) {
    console.log(e.target.value);
    if(e.target.classList.contains('is-active')){
      e.target.classList.remove('is-active');
        var array = this.state.filter;
        var index = array.indexOf(e.target.value);
        if(index !== -1){
          array.splice(index, 1);
          this.setState({
            filter : array
          });
        }
    }else{
      e.target.classList.add('is-active');
      this.setState({
        filter : this.state.filter.concat(e.target.value)
      });
    }
  }



  async getContacts() {    

    if(!this.state.isModalOpen){
      let Json = await fetch(this.props.config.Url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => response.json());
      console.log(Json.Items);
      this.setState({
        //currentContact: this.emptyContact,
        contacts: Json.Items,
      });
    }
    this.intervalID = setTimeout(this.getContacts.bind(this), 10000);
      
          
  }

  async addOrUpdateContact(updatedContact) {
    let method;
    if (updatedContact.uid === '') {
      method = 'POST';
    } else {
      method = 'PUT';
    }
    await fetch(this.props.config.Url, {
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
    await fetch(this.props.config.Url, {
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
    <div className="app">

          <div className="header">
            <h1 className="task-header-title">Koppelspaß </h1> 
            <FontAwesomeIcon onClick={(e) => this.newContact(e)} className="add" icon={ faPlusCircle } color="MediumAquaMarine" transform="grow-15"/>
          </div>
            <div className="task-tools">
              
              <div>
                
                <button className="task-filter is-active" data-param="outorin" value="1" onClick={(e) => this.filter(e)}>
                  Raus ({this.state.contacts.filter(c => c.outorin === "1").length})
                </button>
                <button className="task-filter is-active" data-param="outorin" value="2" onClick={(e) => this.filter(e)}>
                  Nicht raus ({this.state.contacts.filter(c => c.outorin === "2").length})
                </button>
                <button className="task-filter is-active" value="0" onClick={(e) => this.filter(e)}>
                  Egal ({this.state.contacts.filter(c => c.outorin !== "1" && c.outorin !== "2").length})
                </button>
              </div>
            </div>
            
            <div className="sort-wrapper">
              <div className="task-sorter left" onClick={(e) => this.changeSort(e, "outorin")}>
                
                  <p className="task-sort">
                      <FontAwesomeIcon icon={ faSort } transform="grow-5" 
                      />
                  </p>
                
              </div>
              <div className="task-sorter right" onClick={(e) => this.changeSort(e, "position")}>
                  <p className="task-sort">
                      <FontAwesomeIcon icon={ faSort } transform="grow-5" 
                      />
                  </p>
              </div>
            </div>

          <div className="task-list">
            {this.state.contacts.length ? '' : 'Keine Einträge gefunden.'}
          
              {this.state.contacts.filter(c =>  this.state.filter.includes(c.outorin.toString()))
              .sort((a , b) => this.sortinga(a , b))
              .map(contact =>
                <div className={contact.outorin === "1" ? "task-item wantsout" : contact.outorin === "2" ? "task-item wantsnotout" : "task-item"} key={contact.uid}>
                  <label className={contact.outorin === "1" ? "pony-wantout" : contact.outorin === "2" ? "pony-wantnotout" : "pony-dontcare"}></label>
                  <div>
                  
                    <div>
                      <label
                        className="task-name">
                        <span>{contact.name}</span>
                      </label>
                    </div>
                    <div className="status">
                    <label >
                      <span>{contact.note}&emsp;</span>
                    </label>
                    </div>    
                                   
                  </div>
                  <div className="right">
                    <div>
                      <label >
                        <span>{contact.position}</span> 
                      </label>
                      
                    </div>   
                    <div>
                    <label  onClick={() => this.selectContact(contact.uid)}>
                        <span className="edit">
                          <FontAwesomeIcon icon={faEdit} transform="shrink-3"/>
                        </span> 
                    </label> 
                    </div>
                  </div>
                </div>
                    
              )}
          </div>
          </div>
          <PonyDetails
            isOpen={this.state.isModalOpen} 
            onClose={() => this.closeModal()}
            currentContact={this.state.currentContact}
            newContact={() => this.newContact()}
            addOrUpdateContact={(contact) => this.addOrUpdateContact(contact)}
            deleteContact={(contact) => this.deleteContact(contact)} />
        
      </div>
  }
}

export default PonyList;