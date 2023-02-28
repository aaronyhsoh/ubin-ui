import React from 'react';
import './ViewProjects.css';
import ViewProjectsTable from "../../components/ViewProjectsTable/ViewProjectsTable";

class ViewProjects extends React.Component {
  render() {
    return (
      <div className="main-content1">
        {/*<div className="left-empty"/>*/}
        {/*<div className="middle-content">*/}
          <ViewProjectsTable/>
        {/*</div>*/}
        {/*<div className="right-empty"/>*/}
      </div>
    )
  }
}

export default ViewProjects;
