import axios from 'axios';
import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };

export default class PokemonCard extends Component {

    state = {
        name: '',
        imageUrl:'',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: ''
          },
        types: [],
        description: '',
        cardColor:''
    };

    async componentDidMount(){
        const name = this.props.name;
        const url = this.props.url;

        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl);
        const pokemonSpeciesRes = await axios.get(pokemonSpeciesUrl);

        const description = pokemonSpeciesRes.data.flavor_text_entries[0].flavor_text;

        const imageUrl = pokemonRes.data.sprites.front_default;

        const hp = pokemonRes.data.stats[0].base_stat;
        const attack = pokemonRes.data.stats[1].base_stat;
        const defense = pokemonRes.data.stats[2].base_stat;
        const speed = pokemonRes.data.stats[5].base_stat;

        const types = pokemonRes.data.types.map(type => type.type.name);

        const cardColor = pokemonRes.data.types[0].type.name;

        this.setState({name, imageUrl, stats:{hp, attack, defense, speed}, types, description, cardColor});
    }


    render() {

        return (
            <div className="col-md-4 col-sm-6 mb-5">
                <div className="card shadow" style={{borderColor: `#${TYPE_COLORS[this.state.cardColor]}`}}>
                    <div className="card-header">{this.state.name}</div>
                    <div class="text-center">
                    <img class="card-img-top center-block" style={{backgroundColor: `#${TYPE_COLORS[this.state.cardColor]}`}} 
                    src={this.state.imageUrl} alt="Card image cap"></img>
                    </div>
                    <div class="card-body">
                    <p className="poke-description">{this.state.description}</p>
                    {this.state.types.map(type => (
                     <span key={type} className="badge badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: 'white'
                      }}>
                          {type
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}
                    </span>
                  ))}
                     <ProgressBar variant="success" now={this.state.stats.hp} label="HP" />
                     <ProgressBar variant="danger" now={this.state.stats.attack} label="ATTACK" />
                     <ProgressBar variant="info" now={this.state.stats.defense} label="DEFENCE" />
                     <ProgressBar variant="warning" now={this.state.stats.speed} label="SPEED" />
                    </div>
                
                </div>
            </div>
        )
    }
}
