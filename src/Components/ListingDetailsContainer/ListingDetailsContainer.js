import React from 'react';
import PropTypes from 'prop-types';
import Neighborhood from '../Neighborhood/Neighborhood';
import Property from '../Property/Property';
import ListingPhotos from '../ListingPhotos/ListingPhotos';
import ListingDetails from '../ListingDetails/ListingDetails';
import FavoriteListingsDetails from '../FavoriteListingsDetails/FavoriteListingsDetails';
import css from './ListingDetailsContainer.css'

const ListingDetailsContainer = ({currentState, renderCondition, selectedArea, listingDetails, handleFarovites}) => {
  if (renderCondition === 'allAreas') {
    let areaValues = Object.values(currentState.areas)
    var details = areaValues.map(areas => {
      return areas.map(area => {
        return area = <Neighborhood
          key={area.details.id}
          nickname={area.area}
          description={area.details.about}
          fullName={area.details.name}
          id={area.details.id} />
      })
    })
  } else if (renderCondition === 'selectedArea') {
      let listings = selectedArea.details.listings;
      var details = listings.map(listing => {
        return (
          <Property
          selectedArea={selectedArea}
          name={listing.name}
          areaid={listing.area_id}
          key={listing.listing_id}
          listingid={listing.listing_id}/>
        )
      })
  } else if (renderCondition === 'listingDetails') {
    var details = listingDetails;
    return (
      <section className="listingDetailsWrapper">
        <ListingDetails
          areaid={details.area_id}
          listingid={details.listing_id}
          name={details.name}
          address={details.address}
          beds={details.details.beds}
          baths={details.details.baths}
          costPerNight={details.details.cost_per_night}
          features={details.details.features}
          handleFarovites={handleFarovites}/>
        <ListingPhotos listingDetails={listingDetails} />
      </section>
    )
  } else if (renderCondition === 'favorites') {
    var details = currentState.favorites;
    if (!details.length) {
      return (
        <p className="noFavoritesMessage">You do not have any listings saved.</p>
      )
    } else {
      return (
        <section className="allFavoriteListings">
          {
            details.map(favorite => {
              return ( <FavoriteListingsDetails
                favorites={details}
                name={favorite.name}
                areaid={favorite.area_id}
                listingid={favorite.listing_id}
                handleFarovites={handleFarovites}
              /> )
            })
          }
        </section>
      )
    }
  }
  return (
    <section className="listingDetailsContainer">
      {details}
    </section>
  );
}

export default ListingDetailsContainer;

ListingDetailsContainer.propTypes = {
  currentState: PropTypes.object,
  renderCondition: PropTypes.string,
  selectedArea: PropTypes.string,
  handleFarovites: PropTypes.func,
};
