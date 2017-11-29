import React from 'react';
import axios from 'axios';

class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            cocktails: [],
            isToggleOn: false,
            key: '',
            selectedValue: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.getCocktailRecipe = this.getCocktailRecipe.bind(this);
    }
   
    getCocktails(alcohol) {
        axios.get(`http://api.yummly.com/v1/api/recipes`, {
            params: {
                _app_id: 'bd90db8c',
                _app_key: '09d9084e61038c6296815d0591809343',
                q:`coffee ${alcohol}`
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                cocktails: res.data.matches
            })

        })
    }

    getCocktailRecipe(e) {
        // e.preventDefault();
        console.log('clicked!')
       
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            // key: e.target.key
        }));
     console.log(e.target.key);
    }

    getLiqourBrand() {
        
    }

    handleChange(e) {
        this.setState({
            selectedValue: e.target.value
            }, 
            () => this.getCocktails(this.state.selectedValue)
        );
    }

    render() {
        return (
            <div>

                
                <ul>
                    <li onClick={this.handleChange} value="rum">Rum</li>
                    <li onClick={this.handleChange} value="whiskey">Whiskey</li>
                    <li onClick={this.handleChange} value="irish">Irish Cream</li>
                    <li onClick={this.handleChange} value="vodka">Vodka</li>
                </ul>


                {this.state.cocktails.map(cocktail => 
                    <li onClick={this.getCocktailRecipe} key={cocktail.id}>
                        {cocktail.recipeName}
                        <img src={cocktail.smallImageUrls[0].replace(/90$/,'500')} />
                        {this.state.isToggleOn ? <p>{cocktail.ingredients}</p> : null}
                        
                    </li>
                    
                )}

            </div>
        );
    }
}

class CocktailRecipe extends React.Component {

}



export default Gallery;