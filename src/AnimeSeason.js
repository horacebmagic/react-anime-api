import React, { Component } from 'react'
import axios from 'axios'

export default class AnimeSeason extends Component {
  state = { 
    season: '',
    animeSeason: [],
    isRequesting: false,
    years: [],
    seasons: ['winter','spring','summer','fall'],
    filterYear: 0,
    filterSeason: '',
  }
  getSeason() {
    const date = new Date()
    let season = ''
    if (date.getMonth() === 11 || date.getMonth() === 0 || date.getMonth() === 1) {
      season = 'winter'
    } else if (date.getMonth() === 2 || date.getMonth() === 3 || date.getMonth() === 4) {
      season = 'spring'
    } else if (date.getMonth() === 5 || date.getMonth() === 6 || date.getMonth() === 7) {
      season = 'summer'
    } else if (date.getMonth() === 8 || date.getMonth() === 9 || date.getMonth() === 10) {
      season = 'fall'
    }
    this.setState({ season: season })
    return season
  }
  async getAnimeSeason(y, s) {
    const date = new Date()
    const ENDPOINT = (y !== undefined && s !== undefined) 
      ? `https://api.jikan.moe/v3/season/${y}/${s}` 
      : `https://api.jikan.moe/v3/season/${date.getFullYear()}/${this.getSeason()}`
    this.setState({ isRequesting: true })
    const response = await axios.get(ENDPOINT)
    this.setState({ isRequesting: false, animeSeason: [...response.data.anime] })
  }
  generateYears() {
    const date = new Date()
    const now = date.getUTCFullYear();    
    const years = Array(now - (now - 60)).fill('').map((v, idx) => now - idx);
    this.setState({ years: [...years] })
  }
  handleSeasonChange = (e) => {
    e.preventDefault()
    if (this.state.filterYear !== 0 && this.state.filterSeason !== '') {
      this.getAnimeSeason(this.state.filterYear, this.state.filterSeason)
    }
  }
  handleFilterChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount() {
    this.getSeason()
    this.generateYears()
    this.getAnimeSeason()
  }
  render() {
    return (
      <>
        <div className="heading">
          <div style={{ fontWeight: 'bold' }}>
            Anime Season 
            &nbsp;{this.state.filterYear !== 0 ? this.state.filterYear : new Date().getFullYear() } 
            &nbsp;({this.state.filterSeason !== '' ? this.state.filterSeason : this.state.season })
          </div>
          <div className="filter">
            <form onSubmit={ this.handleSeasonChange }>
              <select value={ this.state.filterYear } name="filterYear" onChange={ this.handleFilterChange }>
                {this.state.years.map((year, index) =>
                  <option key={ index } value={ year }>{ year }</option>
                )}
              </select>
              <select value={ this.state.filterSeason } name="filterSeason" onChange={ this.handleFilterChange }>
                {this.state.seasons.map((season, index) =>
                  <option key={ index } value={ season }>{ season }</option>
                )}
              </select>
              <button>go</button>
            </form>
          </div>
        </div>
        <div className="anime-card">
          {this.state.isRequesting 
            ? 'loading...' 
            : this.state.animeSeason.map(anime => 
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
        <div className="detail-page">
          detail page
        </div>
      </>
    )
  }
}
