import axios from 'axios';
import React, { Component } from 'react';

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
        types: []
    };

    async componentDidMount(){
        const name = this.props.name;
        const url = this.props.url;

        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl);

        const imageUrl = pokemonRes.data.sprites.front_default;

        this.setState({name, imageUrl});
    }


    render() {

        return (
            <div className="col-md-4 col-sm-6 mb-5">
                <div className="card">
                    <div className="card-header">{this.state.name}</div>
                    <div class="text-center">
                    <img class="card-img-top center-block" src={this.state.imageUrl} alt="Card image cap"></img>
                    </div>
                </div>
            </div>
        )
    }
}
