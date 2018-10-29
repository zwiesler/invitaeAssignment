import React, { Component } from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

// components
import { geneCol, dnaChangeCol, proteinCol, aliasCol, regionCol, reportedClassCol, lastEvalCol,
         lastUpdateCol, urlCol, sourceCol } from '../../util/Settings';
import VariantTableHeaderCell from './VariantTableHeaderCell';
import { DefaultVariantTableBodyCell, VariantTableLinkCell } from './VariantTableBodyCell';
import API from '../../util/API';


class VariantTable extends Component {
  state = {
    isLoading: true,
    variantData: null
  };

  componentDidMount = () => {
    if (this.props.variantData === null) {
      API.variantTable().getDefault().then(response =>  {
        this.setState({
          isLoading: false,
          variantData: response.data.variant_data
        })
      })
    } else {
      this.setState({isLoading: false});
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.variantData !== prevProps.variantData) {
      this.setState({
        isLoading: false,
        variantData: this.props.variantData
      })
    }
  }

  render() {
    const { isLoading, variantData } = this.state;

    if (isLoading) {
      return <Loader active size='massive'/>;
    }

    return (
      <Table sortable compact celled selectable striped size="small" style={{padding: '0 25px 0 25px'}}>
        <Table.Header>
          <Table.Row>
            <VariantTableHeaderCell name="GENE" width="3%"/>
            <VariantTableHeaderCell name="NUCLEOTIDE CHANGE" width="8%"/>
            <VariantTableHeaderCell name="PROTEIN CHANGE" width="8%"/>
            <VariantTableHeaderCell name="ALIAS" width="8%"/>
            <VariantTableHeaderCell name="REGION" width="8%"/>
            <VariantTableHeaderCell name="REPORTED CLASSIFICATION" width="8%"/>
            <VariantTableHeaderCell name="LAST EVALUATED" width="6%"/>
            <VariantTableHeaderCell name="LAST UPDATED" width="6%"/>
            <VariantTableHeaderCell name="MORE INFO" width="5%"/>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {variantData.map((variant, idx) => (
            <Table.Row key={idx}>
              <DefaultVariantTableBodyCell key={idx + geneCol} val={variant[geneCol]}/>
              <DefaultVariantTableBodyCell key={idx + dnaChangeCol} val={variant[dnaChangeCol]}/>
              <DefaultVariantTableBodyCell key={idx + proteinCol} val={variant[proteinCol]}/>
              <DefaultVariantTableBodyCell key={idx + aliasCol} val={variant[aliasCol]}/>
              <DefaultVariantTableBodyCell key={idx + regionCol} val={variant[regionCol]}/>
              <DefaultVariantTableBodyCell key={idx + reportedClassCol} val={variant[reportedClassCol]}/>
              <DefaultVariantTableBodyCell key={idx + lastEvalCol} val={variant[lastEvalCol]}/>
              <DefaultVariantTableBodyCell key={idx + lastUpdateCol} val={variant[lastUpdateCol]}/>
              <VariantTableLinkCell key={idx + urlCol} url={variant[urlCol]} source={variant[sourceCol]}/>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default withRouter(VariantTable);