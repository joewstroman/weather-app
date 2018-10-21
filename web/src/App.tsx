import { Button, MenuItem, MenuList, Popper } from '@material-ui/core';
import { Done, HighlightOff, WbCloudy, WbSunny } from '@material-ui/icons';
import { assign, each, find, map, sortBy } from 'lodash';
import { AppBar, Paper, TextField } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { isEmail } from 'validator';
import './App.css';
import ConfirmationWrapped from './Confirmation';
import { IApiData, IAppState, ILocation, IRecord} from './Interfaces';

const CITIESAPIURL =  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=1000-largest-us-cities-by-population-with-geographic-coordinates&rows=100&sort=-rank&facet=city&facet=state'
const DATABASEAPIURL = 'http://localhost:9000';

class App extends React.Component<{},IAppState> {

  private anchorEl:HTMLElement;
  // private listRef:React.RefObject<Paper>;
  private visibleLocations:string[][];

  private constructor(props: any) {
    super(props)
    this.state = { menuIndex: 0, showModal: false, locations: [], selection: '', email: '', openAutoComplete: false, validEmail: false }
  }

  public async componentDidMount() {
    this.fetchCities();
  }

  public render() {
    return (
      <MuiThemeProvider>
        <div onKeyDown={this.selector} style={{textAlign: 'center', height: '100%', backgroundColor: '#a2b9de24'}}>
          <ConfirmationWrapped open={this.state.showModal} close={this.closeModal} paper={""} />
          <AppBar showMenuIconButton={false} />
          <h2 style={{color: 'white', top: '-70px', position: 'relative', zIndex: 10000, fontWeight: 200 }}>
            <WbSunny />
              <span style={{margin: '0px 25px'}}>Weather Powered Email</span>
            <WbCloudy />
          </h2>
          <div style={{textAlign: 'center'}}>
            <div style={{width: '50%', display: 'inline-block', color: '#0203448f'}}>Enter your email, select a city below, and prepare to receive email powered by the weather.</div>
          </div>
          <Paper style={{margin: '55px 0px', display: 'inline-block', textAlign: 'center', width: '50%'}}>
            <div style={{margin: '25px 0px'}}>
              <div style={{position: 'relative'}}>
                <div style={{position: 'relative', display: 'inline-block'}}>
                  {(this.state.email.length > 0) ? <Done className={(this.state.validEmail) ? 'visible' : 'invisible' } style={{color: '#2b9a36cc', transition: '1s', position: 'absolute', top: '13px', left: '-32px'}}  /> : null}
                  <TextField id={'email-input-field'} placeholder={'Email'} onChange={this.setEmail} />
                  <HighlightOff className={(this.state.validEmail || this.state.email.length < 1) ? 'invisible' : 'visible' } style={{color: '#de1a1acc', transition: '1s', position: 'absolute', top: '14px', right: '-32px' }} />
                </div>
              </div>
              <div>
                <TextField id={'city-input-field'} placeholder={'City:'} value={this.state.selection} onChange={this.autoComplete} />
                {this.renderMenu()}
              </div>
              <Button disabled={!this.validate()} onClick={this.addToDatabase} variant={"contained"} color={"primary"} style={{backgroundColor: '#049eb3', margin: '20px 0px'}}>Suscribe</Button>
              </div>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }

  private renderMenu = () => {
    this.visibleLocations = [];
    const width = (this.anchorEl) ? this.anchorEl.clientWidth +  'px' : 0;
    return (
      <Popper open={this.state.openAutoComplete} anchorEl={this.anchorEl}>
        <div>
          <Paper ref={"list"} style={{ width, maxHeight: 200, overflow: 'auto' }}>
            <MenuList>
              { map(this.state.locations, this.renderSuggestion) }
            </MenuList>
          </Paper>
        </div>
      </Popper>
    );
  }

  private closeModal = () => {
    this.setState(assign(this.state, { showModal: false }));
  }

  private isValidCity(selection: string) {
    const city = selection.split(",")[0];
    
    const location = find(this.state.locations, (l) => {
      return city === l.city;
    });

    return location !== undefined;
  }

  private validate() {
    if (!this.state.validEmail) {
      return false;
    }
    
    if (!this.isValidCity(this.state.selection)) {
      return false;
    }

    return true;
  }

  private addToDatabase = async (e:React.MouseEvent<HTMLElement>) => {
    if (this.validate()) {
      fetch(DATABASEAPIURL + "/api/emails", {
        body: JSON.stringify({
          email: this.state.email.replace(/(\r\n|\n|\r)/gm, ""),
          location: this.state.selection.replace(/(\r\n|\n|\r)/gm, ""),
        }),
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
    }).then((response) => {
        if (response.status === 200) {
          this.setState(assign(this.state, { showModal: true }));
         }
      });
    }
  }

  private match(input:string, comparison:string) {
    return input.toLowerCase().indexOf(comparison.toLowerCase()) === 0 && comparison.length <= input.length ;
  }

  private renderSuggestion = (location:ILocation) => {
    const cityMatch = this.match(location.city, this.state.selection.split(',')[0]);
    const stateMatch = this.match(location.state, this.state.selection.split(',')[0]); 
    
    if (cityMatch || stateMatch) {
      this.visibleLocations.push([location.city, location.state]);
      const selected = (this.visibleLocations[this.state.menuIndex] && this.visibleLocations[this.state.menuIndex][0] === location.city);
      return <MenuItem selected={selected} key={location.city} onClick={this.menuItemClick}>{`${location.city}, ${location.state}`}</MenuItem>;  
    } else {
      return null;
    }
  }

  private setEmail = (e:React.FormEvent<{}>, email:string) => {
    this.setState(assign(this.state, { email, validEmail: this.validateEmail(email) }));
  }

  private autoComplete = (e:React.FormEvent<{}>, s:string) => {
    this.anchorEl = e.currentTarget as HTMLElement;
    const open = (s.length > 0) ? true : false;
    this.setState(assign(this.state, { menuIndex: 0, selection: s, openAutoComplete: open }));
  }

  private selector = (e:React.KeyboardEvent<{}>) => {
    if (this.visibleLocations.length < 1) {
      this.setState(this.state);
    } else if (e.key === "Enter" && this.state.openAutoComplete) {
      const location = this.visibleLocations[this.state.menuIndex];
      this.setState(assign(this.state, { menuIndex: 0, openAutoComplete: false, selection: `${location[0]}, ${location[1]}` }));
    } else if (e.key === "ArrowDown") {
      if (this.state.menuIndex < this.visibleLocations.length - 1) {
        const ref = findDOMNode(this.refs.list) as Element;
        ref.scrollTop = this.state.menuIndex * 46
        this.setState(assign(this.state, { menuIndex: this.state.menuIndex + 1 }));
      }  
    } else if (e.key === "ArrowUp") {
      if (this.state.menuIndex > 0) {
        const ref = findDOMNode(this.refs.list) as Element;
        ref.scrollTop = (this.state.menuIndex - 1) * 46
        this.setState(assign(this.state, { menuIndex: this.state.menuIndex - 1 }));
      }
    }
  }

  private menuItemClick = (e:React.FormEvent<{}>) => {
    const location = e.target as HTMLElement;
    this.setState(assign(this.state, { menuIndex: 0, openAutoComplete: false, selection: location.innerText }));
  }

  private validateEmail(e: string) {
    if (e.length < 1) {
      return true;
    } else {
      return isEmail(e);
    }
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
