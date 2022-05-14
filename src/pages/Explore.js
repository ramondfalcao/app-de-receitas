import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Explore.css';

export default function Explore() {
  const history = useHistory();
  return (
    <>
      <Header title="Explore" search={ false } />
      <main>
        <section className="section-explore">
          <button
            className="explore-btn"
            id="explore-foods"
            type="button"
            data-testid="explore-foods"
            onClick={ () => history.push('/explore/foods') }
          >
            Explore Foods
          </button>
          <button
            type="button"
            className="explore-btn"
            id="explore-drinks"
            data-testid="explore-drinks"
            onClick={ () => history.push('/explore/drinks') }
          >
            Explore Drinks
          </button>
        </section>
        <Footer />
      </main>
    </>
  );
}
