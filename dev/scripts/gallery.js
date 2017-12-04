import React from 'react';
import axios from 'axios';

class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            cocktails: [],
            isToggleOn: false,
            showCocktailID: '',
            selectedValue: '',
            showPopup: false
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
            console.log(res.data.matches);
            this.setState({
                cocktails: res.data.matches
            })
        })
    }

    getCocktailRecipe(cocktail) {
        // e.preventDefault();
       
        this.setState(prevState => ({
            showCocktailID: cocktail
            
        }));     
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
                <form className="alcoholOption clearfix" value={this.state.selectedValue} onChange={this.handleChange}>
                    <label>
                        <input type="radio" value="rum" checked={this.state.selectedValue === 'rum'}/>
                        <h2>Rum</h2>
                    </label>

                    <label>
                        <input type="radio" value="whiskey" checked={this.state.selectedValue === 'whiskey'}/>
                        <h2>Whiskey</h2>
                    </label>
                    <label>
                        <input type="radio" value="baileys" checked={this.state.selectedOption === 'baileys'}/>
                        <h2>Irish Cream</h2>
                    </label>
                    <label>
                        <input type="radio" value="vodka" checked={this.state.selectedValue === 'vodka'}/>
                        <h2>Vodka</h2>
                    </label>
                </form>               
                <p>Please select a Liquor to see delicious Coffee Cocktails</p>
                <ul className="cocktailDisplay">
                    {this.state.cocktails.map(cocktail => 
                    <li onClick={()=>this.getCocktailRecipe(cocktail.id)}  key={cocktail.id}>
                        <img className="cocktailImage"  src={cocktail.smallImageUrls[0].replace(/90$/,'500')} />
                        <h2>{cocktail.recipeName}</h2>

                        {this.state.showCocktailID === cocktail.id ? <CocktailInfo alcohol={this.state.selectedValue} ingredients={cocktail.ingredients} cocktailId={cocktail.id}/> : null}
                        
                    </li>               
                )}
                </ul>
            
            </div>
        );
    }
}

class CocktailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients:props.ingredients,
            alcohol:props.alcohol,
            liquors: [],
            ingredients:props.ingredients,
            alcohol:props.alcohol
        }

        const result = this.calculateServings(0.75, 200, 1750);// TODO: make this dynamic and move this into render method
        console.log(result);
        this.getCocktailRecipe(this.props.cocktailId);// TODO: move this into render method
    }
   
   componentDidMount(liquor) {
        axios({
            method: 'GET',
            url: 'http://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: 'http://lcboapi.com/products?',
                params: {
                    _access_key: 'MDo2MWJkNGVlZS1kNDgxLTExZTctODVkNC05ZjYwOTU5N2ExMWU6TTZycmVONzJ4N1RrYWtQdXZCMml2OTFDNUpNa1lhbEpQVnNz',
                    q: `${this.state.alcohol}`,
                    per_page: 5
                },
            }
        }).then((res) => {
            
            this.setState({
                liquors: res.data.result
            })
            console.log(this.state.liquors);
        })
    }

    getCocktailRecipe(cocktailId) {
        axios.get(`http://api.yummly.com/v1/api/recipe/${cocktailId}`, {
           params: {
               _app_id: 'bd90db8c',
               _app_key: '09d9084e61038c6296815d0591809343',
            
           }
       }).then((res) => {
           let recipeLines = res.data.ingredientLines;
           console.log(recipeLines);
           console.log(this.searchStringInArray( this.props.alcohol, recipeLines));// TODO: more to be done


       })
   }   

    calculateServings(alcoholAmountCups,numberOfGuests,liquorAmountInMl) {

        let numberOfBottlesNeeded = numberOfGuests / (liquorAmountInMl / (250 * alcoholAmountCups));
        return Math.ceil(numberOfBottlesNeeded);
    }

    searchStringInArray(str, strArray) {
        for (var j = 0; j < strArray.length; j++) {
            if (strArray[j].match(str)) return j;
        }
        return -1;
    }
    
    render(){
        return(
            <div>
                <p>commit</p>
                <input type="text"/>
                {this.state.ingredients}
                {this.state.liquors.length > 0 ?
                <Flickity
                    className={'carousel'} 
                    elementType={'div'}  
                    options={flickityOptions} 
                    imagesLoaded={true}  
                >
                {this.state.liquors.map(liquor => 
                    <div key={liquor.id} className="liquorBottle">
                        <img src={liquor.image_url} className="bottleImage"/> 
                        <p className="liquorName">{liquor.name}</p>
                    </div>
                )};
                    
                </Flickity>
                : null}
            </div>
        )
    }
}
export default Gallery;