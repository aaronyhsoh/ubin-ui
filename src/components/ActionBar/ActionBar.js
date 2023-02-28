import React from 'react';
import './ActionBar.css';
import DefaultButton from '../DefaultButton';
import download_csv from "../../images/download_csv.png";
import upload_csv from "../../images/upload_csv.png";
import {distributeDividendStore} from "../../store/DistributeDividendStore";
import {IntlProvider, FormattedMessage} from 'react-intl';
import {properties} from "../../utils/Properties";
const $ = require('jquery');

class ActionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {resetting: false};
  }

  handleCSVDownload() {
    var header = "";
    let csvContent = "data:text/csv;charset=utf-8,";
    for (let i = 0; i < distributeDividendStore.headerRow.length; i++) {
      if (i < distributeDividendStore.headerRow.length - 1) {
        header += distributeDividendStore.headerRow[i].title + ",";
      } else {
        header += distributeDividendStore.headerRow[i].title;
      }
    }
    csvContent += header + "\n";
    if (distributeDividendStore.updatedData.length > 0) {
      for (let i = 0; i< distributeDividendStore.updatedData.length; i++) {
        let row = distributeDividendStore.updatedData[i].join(",");
        csvContent += row + "\n";
      }
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  }

  handleCSVUpload(file) {
    this.setState({ resetting: true }, () => {
      this.setState({resetting: false });
    });
    if (file !== undefined) {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const content = reader.result;
        const result = this.csvToArray(content);
        if (result !== false) {
          distributeDividendStore.updatedData = result;
          distributeDividendStore.initHeaderRow();
          distributeDividendStore.tableData.destroy();
          distributeDividendStore.tableData.columns.adjust().draw();
          this.props.update();
        }
        else {
          alert("Error in data");
        }
      }
    }
  }

  csvToArray(csv) {
    var maxLength = distributeDividendStore.headerRow.length;
    var minLength = distributeDividendStore.headerRow.length;
    var csvArray = csv.split("\n");
    for (let i = 0; i < csvArray.length; i++) {
      if (csvArray[i] == "") { csvArray.splice(i, 1); continue; }
      csvArray[i] = csvArray[i].split(",");
      if (csvArray[i].length > maxLength || csvArray[i].length < minLength) {
        return false;
      }
    }
    return csvArray;
  }

  render() {
    return(
      <IntlProvider locale="en" defaultLocale="en">
        <div className="left-group">
          <div className="clearRowsButton">
            <DefaultButton
              buttonValue={distributeDividendStore.setLanguage().actionBar.clearRows}
            />
          </div>
          <div className="deleteRowsButton">
            <DefaultButton
              buttonValue={distributeDividendStore.setLanguage().actionBar.deleteRows}
            />
          </div>
        </div>
        <div className="right-group">
          <div className="submitButton">
            <DefaultButton
              buttonValue={distributeDividendStore.setLanguage().actionBar.submit}
              showModal={this.props.showOrHideModal}
            />
          </div>
          <div className="csv-buttons">
            <div className="download-csv-button">
              <img
                src={download_csv}
                width='35px'
                height='35px'
                onClick={() => this.handleCSVDownload()}
                style={{cursor: 'pointer'}}
                alt="Download CSV file"
              />
            </div>
            {!this.state.resetting && (
              <div className="upload-csv-button">
                <img
                  src={upload_csv}
                  width='35px'
                  height='35px'
                  onClick={() => { $('#file').trigger('click') }}
                  style={{cursor: 'pointer'}}
                  alt="Upload CSV file"
                />
                <input
                  type='file'
                  id='file'
                  accept='.csv'
                  onChange={e => this.handleCSVUpload(e.target.files[0])}
                />
              </div>
            )}
          </div>
        </div>
      </IntlProvider>
    )
  }
}

export default ActionBar;
