import React from 'react';
import { Table } from 'semantic-ui-react';


export default function VariantTableHeaderCell(props) {
  return (
    <Table.HeaderCell style={{fontFamily: 'ScalaSansWeb',
                             textTransform: 'uppercase',
                             color: '#fff',
                             cursor: 'pointer',
                             textAlign: 'left',
                             backgroundColor: '#1a989e',
                             padding: '9px 17px 6px 9px',
                             width: props.width}}>
      {props.name}
    </Table.HeaderCell>
  )
}