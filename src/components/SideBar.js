import React from 'react'

export const SideBar = ({openSideBar}) => (
  <div>
    {/*If the sidebar is open you need to add the css class filter-is-visible to the div below*/}
    <div className={"filter"}>
      <form onSubmit={e => e.preventDefault()}>
        <div className="filter-block">
          <h4>Search</h4>
          <div className="filter-content">
            <input type="search" placeholder="title" />
          </div>
        </div>
      </form>
      <a className="hand-cursor close-f" onClick={openSideBar}>
        Close
      </a>
    </div>

    <a className="hand-cursor filter-trigger">Filters</a>
  </div>
);
