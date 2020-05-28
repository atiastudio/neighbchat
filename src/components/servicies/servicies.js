import React from 'react';

import ServiceCard from '../service-card';

import './servicies.css';

class Servicies extends React.Component {
  // ------------ STATE ------------
  state = {
    servicies: [
      {
        id: 1,
        title: 'Request Service 1',
        img: '/img/services/cleaning.jpg',
      },
      {
        id: 2,
        title: 'Request Service 2',
        img: '/img/services/laundry.jpg',
      },
      {
        id: 3,
        title: 'Request Service 3',
        img: '/img/services/dog.jpg',
      },
      {
        id: 4,
        title: 'Request Service 4',
        img: '/img/services/taxi.jpg',
      },
    ],
  };

  // ------------ RENDER ------------
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
