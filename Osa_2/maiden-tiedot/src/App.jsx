import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import { Filter, Countries } from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showFiltered, setShowFiltered] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(showFiltered.toLowerCase())
  )

  return (
    <div>
      <Filter filteredCountries={showFiltered} onChange={setShowFiltered} />
      <Countries
        filteredCountries={filteredCountries}
        onShowCountry={setShowFiltered} />
    </div>
  )
}

export default App
