import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        };

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }


    onUpdateSearch(e) { //e - следит за тем, что вносят в input
        const term = e.target.value; //получаем данные, ктр внес пользователь
        this.setState({
            term: term
        });
        this.props.onUpdateSearch(term); //передаем в виде props,т.к. term нужно обновить не только здесь, но и app.js, onUpdateSearch записан в app.js
    }

    render(){
        return (
            <input 
                className='form-control search-input'
                type='text'
                placeholder='Поиск по записям'
                value={this.state.term}
                onChange = {this.onUpdateSearch} //onChange - польз.вносит инфо, onUpdateSearch - будет следить, что вносит польз и изм state
            />  
        )
    }

}

