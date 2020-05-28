import React from 'react';

import './search-panel.css'

const SearchPannel = ({onFiltred}) => {
  return (<input
            className="form-control search-input"
            placeholder="type to search"
            onChange={(e) => onFiltred(e.target.value)} />
  );
};

export default SearchPannel;