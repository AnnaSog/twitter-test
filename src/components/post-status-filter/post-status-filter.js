import React, {Component} from 'react';

import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props){
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'}
        ]  
    }

    render(){
        const buttons = this.buttons.map(({name, label}) => { //map -перебирает и создает новый[] с указан. в return данными 
            const active = this.props.filter === name;     //this.props.filter - приходит из app.js <PostStatusFilter/>
            const clazz = active ? 'btn-info' : 'btn-outline-secondary' //если выбранная кнопка становится активной, не выбранная не активн

            return(
                <button 
                    key={name} 
                    type='button' 
                    className={`btn ${clazz}`}
                    onClick = {() => this.props.onFilterSelect(name)} //эта фун-ия приходит как props из app.js <PostStatusFilter/>
                >
                    {label}
                </button>
            )
        });

        return(
            <div className='btn-group'>
                {buttons}
            </div>
        )
    }

}
