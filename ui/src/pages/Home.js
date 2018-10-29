import React, { Component } from 'react';
import { Grid, Image, Header, Dropdown } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import VariantTable from '../components/VariantTable/VariantTable';
import SearchIcon from '../components/SearchIcon/SearchIcon';
import InvitaeLogo from '../static/invitae_logo.png';

// components
import API from '../util/API';


class Home extends Component {
  state = {
    isLoading: false,
    searchTerm: null,
    autosuggestOptions: [],
    variantData: null
  }

  searchByGene = () => {
    this.setState({isLoading: true});
    API.variantTable().getGene(this.state.searchTerm).then(response => {
      this.setState({
        isLoading: false,
        variantData: response.data.variant_data 
      });
    })
  }

  autocomplete = () => {
    API.variantTable().autocomplete(this.state.searchTerm).then(response => {
      this.setState({
        autosuggestOptions: response.data.autosuggest_genes.map((gene) => {
          return {key: gene, text: gene, value: gene}
        })
      })
    });
  }

  handleClick = (e) => {
    this.searchByGene(e.nativeEvent.srcElement.value);
  }

  handleKeyUp = (e) => {
    this.setState({searchTerm: e.nativeEvent.srcElement.value})
    if (e.key === 'Enter') {
      this.searchByGene();
    } else {
      this.autocomplete();
    }
  }

  render() {
    const { isLoading, variantData, autosuggestOptions } = this.state;
    
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}/>
          <Grid.Column width={14}>
            <Grid>
              <Grid.Column width={4}>
                <Image src={InvitaeLogo} size='small'/>
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid.Row>
                  <Header as='h1' style={{fontFamily: 'ScalaSansWeb',
                                          color: '#525252',
                                          padding: '9px 17px 6px 9px'}}>
                    Variant Search
                  </Header>
                </Grid.Row>
                <Grid.Row>
                  <Dropdown fluid 
                            search
                            multiple 
                            clearable
                            selection
                            closeOnChange
                            loading={isLoading}
                            noResultsMessage=''
                            placeholder='Search for genes'
                            options={autosuggestOptions}
                            icon={<SearchIcon handleClick={this.handleClick}/>}
                            onKeyUp={(e) => this.handleKeyUp(e)}
                            style={{width: '40%'}}/>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={1}/>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <VariantTable variantData={variantData}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default withRouter(Home);
