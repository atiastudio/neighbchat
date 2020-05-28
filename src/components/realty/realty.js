import React from 'react';

import ServiceCard from '../service-card';

import './realty.css';

class Servicies extends React.Component {
  state = {
    servicies: [
      {
        id: 1,
        title: 'Buy',
        img: '/img/realty/image1.jpg',
      },
      {
        id: 2,
        title: 'Sell',
        img: '/img/realty/image2.jpg',
      },
      {
        id: 3,
        title: 'Rent',
        img: '/img/realty/image3.jpg',
      },
      {
        id: 4,
        title: 'Lease',
        img: '/img/realty/image4.jpg',
      },
    ],
  };

  render() {
    const { servicies } = this.state;
    return (
      <div className="col-sm-9 d-flex align-items-center">
        <div className="row">
          {servicies.map(({ id, title, img }) => (
            <ServiceCard key={id} title={title} img={img} />
          ))}
        </div>
      </div>
    );
  }
}

export default Servicies;
