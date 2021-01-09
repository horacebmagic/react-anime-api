import Home from './Home'
import AnimeSeason from './AnimeSeason'
import AnimeSchedule from './AnimeSchedule'

const routes = [
  {
    name: 'Home',
    route: '/',
    component: (routeProps) => <Home {...routeProps} />,
    isExact: true
  },
  {
    name: 'Anime Schedule',
    route: '/anime-schedule',
    component: (routeProps) => <AnimeSchedule {...routeProps} />,
    isExact: true
  },
  {
    name: 'Anime Season',
    route: '/anime-season',
    component: (routeProps) => <AnimeSeason {...routeProps} />,
    isExact: true
  },
]

export default routes