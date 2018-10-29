import React from 'react';
import { Table } from 'semantic-ui-react';

export function DefaultVariantTableBodyCell(props) {
  return (
    <Table.Cell>{props.val}</Table.Cell>
  )
}

export function VariantTableLinkCell(props) {
  return (
    <Table.Cell>
      <a href={props.url} target='_blank' rel="noopener noreferrer">{props.source}</a>
    </Table.Cell>
  )
}