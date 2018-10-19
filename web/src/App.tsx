import { Button, MenuItem, MenuList, Popper } from '@material-ui/core';
import { Done, HighlightOff, WbCloudy, WbSunny } from '@material-ui/icons';
import { assign, each, map, sortBy } from 'lodash';
import { AppBar, Paper, TextField } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import { isEmail } from 'validator';
import './App.css';
import { IApiData, IAppState, ILocation, IRecord} from './Interfaces';

const CITIESAPIURL =  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=1000-largest-us-cities-by-population-with-geographic-coordinates&rows=100&sort=-rank&facet=city&facet=state'

class App extends React.Component<{},IAppState> {

  private anchorEl:HTMLElement;

  private constructor(props: any) {
    super(props)
    this.state = { locations: [], selection: '', email: '', openAutoComplete: false, validEmail: true }
  }

  public render() {
    return (
      <MuiThemeProvider>
        <div style={{textAlign: 'center', height: '100%', backgroundColor: '#a2b9de24'}}>
          <AppBar showMenuIconButton={false} />
          <h2 style={{color: 'white', top: '-70px', position: 'relative', zIndex: 10000, fontWeight: 200 }}>
            <WbSunny />
              <span style={{margin: '0px 25px'}}>Weather Powered Email</span>
            <WbCloudy />
          </h2>
          <Paper style={{margin: '100px 0px', display: 'inline-block', textAlign: 'center', width: '50%'}}>
            {/* <h3>Please select your city:</h3> */}
            <div style={{margin: '25px 0px'}}>
              <div style={{position: 'relative'}}>
                <TextField id={'email-input-field'} placeholder={'Email Address'} onChange={this.setEmail} />
                <HighlightOff className={(this.state.validEmail) ? 'invisible' : 'visible' } style={{color: '#de1a1acc', transition: '1s', position: 'absolute', top: '14px', right: '52px'}}/>
                {(this.state.email.length > 0) ? <Done className={(this.state.validEmail) ? 'visible' : 'invisible' } style={{color: '#2b9a36cc', transition: '1s', position: 'absolute', top: '13px', left: '52px'}}  /> : null}
              </div>
              <div>
                <TextField id={'city-input-field'} placeholder={'City:'} value={this.state.selection} onChange={this.autoComplete} />
                {this.renderMenu()}
              </div>
              <Button variant={"contained"} color={"primary"} style={{backgroundColor: '#049eb3', margin: '20px 0px'}}>Suscribe</Button>
              </div>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }

  public async componentDidMount() {
    this.fetchCities();
  }

  private renderSuggestion = (location:ILocation) => {
    return ( 
      (location.city.toLowerCase().indexOf(this.state.selection.split(',')[0].toLowerCase()) > -1) ? 
      <MenuItem key={location.city} onClick={this.menuItemClick}>{`${location.city}, ${location.state}`}</MenuItem> :
      null
    )
  }

  private setEmail = (e:React.FormEvent<{}>, email:string) => {
    this.setState(assign(this.state, { email, validEmail: this.validateEmail(email) }));
  }

  private menuItemClick = (e:React.FormEvent<{}>) => {
    const city = e.target as HTMLElement;
    this.setState(assign(this.state, { openAutoComplete: false, selection: city.innerText }))
  }

  private renderMenu = () => {
    const width = (this.anchorEl) ? this.anchorEl.clientWidth - 30 + 'px' : 0;
    // const height = (this.anchorEl) ? this.anchorEl.clientHeight + 'px' : 0;
    return (
      <Popper style={{ width }} open={this.state.openAutoComplete} anchorEl={this.anchorEl}>
        <Paper style={{ maxHeight: 200 , overflow: 'auto' }}>
          <MenuList>
            { map(this.state.locations, this.renderSuggestion) }
          </MenuList>
        </Paper>
      </Popper>
    );
  }

  private validateEmail(e: string) {
    if (e.length < 1) {
      return true;
    } else {
      return isEmail(e);
    }
  }

  private autoComplete = (e:React.FormEvent<{}>, s:string) => {
    this.anchorEl = e.currentTarget as HTMLElement;
    const open = (s.length > 0) ? true : false;
    this.setState(assign(this.state, { selection: s, openAutoComplete: open }));
  }

  private save(data:IApiData) {
    let locations:ILocation[] = [];
    each(data.records, (record:IRecord) => {
      if (record.fields.rank <= 100) {
        const location = { city: record.fields.city, state: record.fields.state };
        locations.push(location);
      }
    });
    locations = sortBy(locations, (city) => city.city);
    this.setState(assign(this.state, { locations }));
  }
  private async fetchCities() {
    const resp = await fetch(CITIESAPIURL);
    if (resp.status !== 200) {
      alert(`Could not fetch data from ${CITIESAPIURL}`);
      return;
    } else {
      if (!resp.body) {
        alert('Data returned from api is empty');
      } else {
        const data:IApiData = await resp.json();
        this.save(data);
      }
    }
  }
}

export default App;
