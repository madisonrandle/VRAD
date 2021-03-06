import React from 'react';
import { render, fireEvent, findByText } from '@testing-library/react';
import ListingDetailsContainer from './ListingDetailsContainer';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'
import Property from '../Property/Property'
import { getListings } from '../../apiRequest'
jest.mock('../../apiRequest')

describe(ListingDetailsContainer, () => {

  const mockedState = {
    areas: {
      areas: [{
        area: 'RiNo',
        details: {
          id: 590,
          name: 'River North',
          location: 'North of Downtown Denver',
          about: 'Rino is Great',
          listings: {
            name: 'Hip RiNo Party Spot',
            address: {
              street: '2250 lawrence drive',
              zip: '49494'
            },
            area: 'rino',
            area_id: 590,
            details: {
              baths: 2.5,
              beds: 3,
              cost_per_night: 420,
              features: ['hot tub', 'esspresso machine'],
              listing_id: 5
            }
          }
        }
      }, {
        area: 'Park Hill',
        details: {
          id: 591,
          name: 'Park Hill',
          location: 'Around Denver',
          about: 'Park Hill is Great',
          listings: {
            name: 'Park Hill Party Spot',
            address: {
              street: '0001 young drive',
              zip: '49492'
            },
            area: 'park hill',
            area_id: 499,
            details: {
              baths: 2.5,
              beds: 3,
              cost_per_night: 420,
              features: ['hot tub', 'esspresso machine'],
              listing_id: 3
            }
          }
        }
      }]
    }
  }

  const mockedSelectedArea = {
  area: 'RiNo',
  details: {
    id: 599,
    name: 'River North',
    location: 'North of Downtown Denver',
    about: 'Rino is Great',
    listings: [{
      name: 'Hip RiNo Party Spot',
      address: {
        street: '2250 lawrence drive',
        zip: '49494'
      },
      area: 'rino',
      area_id: 590,
      details: {
        baths: 2.5,
        beds: 3,
        cost_per_night: 420,
        features: ['hot tub', 'esspresso machine'],
        listing_id: 3
      }
    }]
  }
}

  it('renders without crashing', () => {
   const listingDetailsContainer = render(<ListingDetailsContainer />)
  });

  it('should render Neighborhoods by default', () => {
    const { getByText } = render(<MemoryRouter><ListingDetailsContainer currentState={mockedState} renderCondition={'allAreas'} /></MemoryRouter>)
    const rino = getByText('River North')
  })

  it('should render the selected Neighborhood', () => {
    const { getByText } = render(<MemoryRouter><Property key={mockedSelectedArea.details.id} currentState={mockedState} selectedArea={mockedSelectedArea} renderCondition={'selectedArea'} /></MemoryRouter>)
    const rino = findByText('Hip RiNo Party Spot')
  })

})
