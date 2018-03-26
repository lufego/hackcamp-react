import React from 'react'

export const Filters = ({filters, selectTab}) => (
  <div className="tab-filter-wrapper">
    <div className="tab-filter">
      <div className="filters">
        <ul className="filters-list">
          {filters.map(filter => (
            /** Come back on that later on **/
            <li key={filter.category} onClick={() => selectTab(filter.category)}>
              <a className={filter.selected ? "selected" : ""}>
                {filter.category}
              </a>
            </li>
          ))}
        </ul>
        <ul className="misc">
          <li className="counter">
            <a>42</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
