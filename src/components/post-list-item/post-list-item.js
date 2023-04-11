import React, {Component} from 'react';
import './post-list-item.css';

export default class PostListItem extends Component{  //посты будте изм.(лайки, важность, фильтр) из-за создаем class
    
    //ЭТО УЖЕ НЕАКТУАЛЬНО ИЗ-ЗА ТОГО, ЧТО СОЗДАНЫ НОВЫЕ ФУН-ИИ onToggleImportant И onToggleLiked В APP.JS, КТР СВЯЗЫВАЮ С HEADER С ПОДСЧЕТОМ 
    // constructor(props){
    //     super(props);
    //     this.state = {      //state -пользователь сможет изм состоние, т.е. указать важный пост или нет
    //         important: false,
    //         like: false
    //     }

    //     //чтобы обработчик сработал, необходимо его привязать к this. Каждый новый обект получит этот метод 
    //     this.onImportant = this.onImportant.bind(this);
    //     this.onLike = this.onLike.bind(this);
    // }

    // //создаем сам метод, ктр сработает при клике на звезду и он будет изменять состояние с важного на не важный и наоборот
    // onImportant() {
    //     this.setState(({important})=> ({   //Только с помощью setState сможем зменить состоние 
    //         important: !important          //если был важным станет не важным 
    //     }))
    // }

    // onLike() {
    //     this.setState(({like})=> ({   
    //         like: !like          
    //     }))
    // }
    
    render(){ //создает эл. и помещает на стр

        const {label, onDelete, onToggleImportant, onToggleLiked, important, like} = this.props; //это св-во ктр будет приходит из app.js
        let classNames = 'app-list-item d-flex justify-content-between';

        if(important){          //если important указан, т.е. true, 
            classNames += ' important'; //то к классам добавляется стиль important и ВАЖНО указать пробел, т.к.добавляется к строке
        }
        if(like){          //если like указан, т.е. true, 
            classNames += ' like'; //то к классам добавляется стиль like и ВАЖНО указать пробел, т.к.добавляется к строке
        }


        return(
            <div className={classNames}>
                <span className='app-list-item-label' onClick = {onToggleLiked}>
                    {label}
                </span>
                <div className='d-flex justify-content-center aling-item-center'>
                    <button type='button'className='btn-star btn-sm' onClick = {onToggleImportant} >
                        <i className='fa fa-star'></i>
                    </button>
                    <button type='button' className='btn-trash btn-sm' onClick = {onDelete}> 
                        <i className='fa fa-trash'></i>
                    </button>
                    <button type='button'className='btn-heart btn-sm' onClick = {onToggleLiked} >
                        <i className='fa fa-heart'></i>
                    </button>
                </div>
            </div>
        )
    }
}

//При нажатии на кнопку мусор срабатывает событие onClick, ктр запускает фун-ии и посл фун-ия заканивается на deleteItem
