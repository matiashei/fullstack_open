import { Weather } from './Weather'

export const Filter = ({ filteredCountries, onChange }) => {
  return (
    <div>
      find countries <input value={filteredCountries} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

export const Countries = ({ filteredCountries, onShowCountry }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <h2>Weather in {country.capital}</h2>
        <Weather capital={country.capital} />
      </div>
    )
  } else {
    return (
      <ul>
        {filteredCountries.map(country => (
          <li key={country.cca3}>{country.name.common}
            <button onClick={() => onShowCountry(country.name.common)}>
              Show
            </button>
          </li>
        ))}
      </ul>
    )
  }
}