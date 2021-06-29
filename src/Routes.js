import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Main from './Pages/Main/Main';
import SaleRoom from './Pages/SaleRoom/SaleRoom';
import Product from './Pages/Product/Product';
import MapPage from './Pages/Map/MapPage';
import LoginModal from './Components/LoginModal/LoginModal';

function Routes() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/rooms/:id" component={Product} />
        <Route exact path="/login" component={LoginModal} />
        <Route exact path="/saleroom" component={SaleRoom} />
        <Route exact path="/map" component={MapPage} />
        <Route exact path="/" component={Main} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
export default Routes;
