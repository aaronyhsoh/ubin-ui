import React from 'react';
import './DataTable.css'
import { distributeDividendStore } from "../../store/DistributeDividendStore";

const $ = require('jquery');
$.DataTable = require('datatables.net');
$.selector = require('datatables.net-select-dt');

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.updateTable = this.updateTable.bind(this);
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.initDataTable()
  }

  componentWillUnmount() {
    this.$el.DataTable().destroy(true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      $("#myTable").html('<tbody></tbody>');
      this.initDataTable();
    }
  }

  initDataTable() {
    $('#myTable').DataTable({
      data: this.props.data,
      columns: this.props.columns,
      select: {
        style: 'multi'
      },
      scrollX: true,
      sScrollY: true,
      //autoWidth: false
    });

    $.fn.dataTable.ext.search.push(
      function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var age = parseFloat( data[3] ) || 0; // use data for the age column

        if ( ( isNaN( min ) && isNaN( max ) ) ||
          ( isNaN( min ) && age <= max ) ||
          ( min <= age   && isNaN( max ) ) ||
          ( min <= age   && age <= max ) )
        {
          return true;
        }
        return false;
      }
    );

    distributeDividendStore.tableData = $('#myTable').DataTable();
    $(document).ready(function() {
      var table = $('#myTable').DataTable();

      $('#min, #max').keyup(function() {
        table.draw();
      })

      $('#myTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
        distributeDividendStore.tableData = table;
      });

    });
  }

  updateTable() {
    this.setState({
      data: distributeDividendStore.fetchedData
    })
  }

  render() {
    return(
      <div>
        <table className="display" width="100%" ref={el => this.el = el} select="true" id="myTable">
        </table>
      </div>
    )
  }
}

export default DataTable;
