import './VeggiePopup.css'
import ProfileDetails from '../ProfileDetails/ProfileDetails.jsx'
import * as veggieApi from 'veggie'
import React from 'react'
import HeaderActions from '../HeaderActions/HeaderActions.jsx'

export default class VeggiePopup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      order: {
        alpha: true,
        last: false
      },
      selectedId: null
    }

    this.select = this.select.bind(this)
    this.clickBack = this.clickBack.bind(this)
    this.clickReset = this.clickReset.bind(this)
    this.loadProfile = this.loadProfile.bind(this)
    this.loadCurrentProfile = this.loadCurrentProfile.bind(this)
  }

  select (id, event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.state.selectedId === id) {
      this.setState({ selectedId: null })
    } else {
      this.setState({ selectedId: id })
    }
  }

  clickBack () {
    this.setState({ selectedId: null })
  }

  async clickReset () {
    await veggieApi._resetProfile()
    this.props.getData()
  }

  async loadProfile (id) {
    const payload = { id }
    await veggieApi._loadProfile({ payload })
    this.props.getData()
  }

  loadCurrentProfile () {
    return this.loadProfile(this.state.selectedId)
  }

  render () {
    let section

    if (this.props.status.fetching) {
      section = 'Loading...'
    }
    
    if (this.props.status.error) {
      section = (
        <div>
          <div className="Popup-accessory">
            <button onClick={this.props.getData}>Try again</button>
          </div>
          {this.props.status.errorMessage}
        </div>
      )
    }
    
    if (this.props.status.ok) {
      if (this.state.selectedId) {
        section = (
          <div>
            <ProfileDetails profile={this.props.profilesById[this.state.selectedId]} is_current={this.props.currentProfile === this.state.selectedId} />
          </div>
        )
      } else {
        section = (
          <div>
            <h2>Current Profiles</h2>
            <ul className="Profile-list">
              {this.props.profileIds.map(id =>           
                <li className="List-item--selectable {className}" onClick={this.loadProfile.bind(this, id)} key={id}>
                  {this.props.profilesById[id].name}
                  <a href="#" className="List-itemDetails Button Button--secondary" onClick={this.select.bind(this, id)}>Details</a>
                  {this.props.currentProfile === id ? <span className="Content-right Content-info">CURRENT</span> : ''}
                </li>
              )}
            </ul>
          </div>
        )
      }
    }

    return (
      <div className="Popup">
        {(this.props.status.ok && this.state.selectedId) ?
            <HeaderActions
              primaryActionText="Back"
              primaryAction={this.clickBack}
              secondaryActionText="Load"
              secondaryAction={this.loadCurrentProfile}
            /> :
            <HeaderActions
              headerText="Veggie"
              primaryActionText="Reset"
              primaryAction={this.clickReset}
            />
        }
        <section className="Popup-section">{section}</section>
      </div>
    )
  }
}
