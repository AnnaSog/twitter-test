import React, {Component} from 'react';
import './post-add-form.css';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onValueChange(e){    //если обращаемся к input и нужен его value, то необходимо использовать event(e)
        this.setState({
            text: e.target.value //в текст указываем информацию, ктр внес пользователь в input
        });
    }

    onSubmit(e){
        e.preventDefault();
        this.props.onAdd(this.state.text) //в text state заменяется на новый пост по шаблону onAdd с инфо от полльз.
        this.setState({
            text: ''        //после отправки информации, input снова очищается 
        });
    }

    render() {
        return(
            <form 
                className='bottom-panel d-flex'
                onSubmit = {this.onSubmit}  //пользователь отправляет сообщение
                > 
                <input 
                    type='text'
                    placeholder='О чем вы думаете сейчас?'
                    className='form-control new-post-label'
                    onChange = {this.onValueChange} //пользователь вносит текст в input
                    value = {this.state.text}   //связали input со состоянием (state), чтобы можно было настроить очистку состояния 
                />
                <button 
                    type='submit'
                    className='btn btn-outline-secondary'>
                    Добавить
                </button>
            </form>
        )
    }
}

