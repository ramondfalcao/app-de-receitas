import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import CardDrinks from '../components/CardDrinks';
import Header from '../components/Header';

export default function Drinks(props) {
  const { history } = props;
  const drinks = useSelector((state) => state.drinksReducer.drinks);
  function teste() {
    if (drinks === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (drinks.length === 1) {
      return history.push(`/drinks/${drinks[0].idDrink}`);
    }
    return <CardDrinks />;
  }
  return (
    <div>
      <Header title="Drinks" search />
      { teste() }
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

// return drinks === null
//       ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
//       : drinks.length === 1
//         ? history.push(`/drinks/${drinks[0].idDrink}`)
//         : <CardDrinks />;
