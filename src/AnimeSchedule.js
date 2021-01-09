import React, { Component } from 'react'
import axios from 'axios'

class AnimeSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRequesting: false,
      animeLists: [],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      filterDay: '',
    }
  }
  handleAnimeSchedule = async day => {
    const ENDPOINT = `https://api.jikan.moe/v3/schedule/${ day }`
    this.setState({ isRequesting: true })
    const response = await axios.get(ENDPOINT)
    if (day === 'Sunday') {
      this.setState({ isRequesting: false, animeLists: [...response.data.sunday] })
    } else if (day === 'Monday') {
      this.setState({ isRequesting: false, animeLists: [...response.data.monday] })
    } else if (day === 'Tuesday') {
      this.setState({ isRequesting: false, animeLists: [...response.data.tuesday] })
    } else if (day === 'Wednesday') {
      this.setState({ isRequesting: false, animeLists: [...response.data.wednesday] })
    } else if (day === 'Thursday') {
      this.setState({ isRequesting: false, animeLists: [...response.data.thursday] })
    } else if (day === 'Friday') {
      this.setState({ isRequesting: false, animeLists: [...response.data.friday] })
    } else if (day === 'Saturday') {
      this.setState({ isRequesting: false, animeLists: [...response.data.saturday] })
    }
  }
  handleFilterChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => { this.handleAnimeSchedule(this.state.filterDay) })
  }
  componentDidMount() {
    this.setState({ filterDay: this.state.days[new Date().getDay()] }, () => { this.handleAnimeSchedule(this.state.filterDay) })
  }
  render() {
    return (
      <>
        <div className="heading">
          <div style={{ fontWeight: 'bold' }}>
            Today's Anime Schedule ({ this.state.filterDay })
          </div>
          <div className="filter">
            <select value={ this.state.filterDay } name="filterDay" onChange={ this.handleFilterChange }>
              {this.state.days.map((day, index) =>
                <option key={ index } value={ day }>{ day }</option>
              )}
            </select>
          </div>
        </div>
        <div className="anime-card">
          {this.state.isRequesting 
            ? 'loading...' 
            : this.state.animeLists.map(anime => 
                <div  key={ anime.mal_id } className="anime">
                  <img src={ anime.image_url } alt={ anime.title } />
                  <div className="container">
                    <p className="title">{ anime.title }</p>
                    <span>
                      read more
                    </span>
                  </div>
                </div>
              )
          }
        </div>
      </>
    )
  }
}

export default AnimeSchedule