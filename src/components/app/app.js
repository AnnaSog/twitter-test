import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`  
    margin: 0 auto;
    max-width: 800px;
`
// вместо div указываем эл ктр хотим создать

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {      //state -пользователь сможет изм состоние
            data: [
                {label: 'Going to learn React', important: true, like:false, id: 1},
                {label: 'That is so good', important: false, like:false, id: 2},
                {label: 'I need a break...', important: false, like:false, id: 3}
            ],
            term: '', //поиск поста
            filter: 'all' //по умолчанию будет показывать все посты
        };

        //чтобы обработчик c фун-ей сработал, необходимо его привязать к this, иначе при render эту фун-ию не увидит. Каждый новый обект получит этот метод 
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4; //новый пост будет id:4
    }

    deleteItem(id){
        this.setState(({data}) => {
            const newArr = data.filter((elem) => elem.id !== id); //каждый elem в посте, filter создаем новый[] с изменениями
            return {
                data: newArr //в data запишем скопированный, но изменный []
            };
        });
    }

    addItem(body){  
        const newItem = {   //шаблон нового поста 
            label: body,
            important: false,
            id: this.maxId++
        };

        this.setState(({data}) => {
            const newArr = [...data, newItem]; //...data - все содержание data + новый пост 
            return {
                data: newArr
            };
        });
    }

    onToggle(id, item){
        this.setState(({data}) => {   //будем изменять содержание data
            const index = data.findIndex(elem => elem.id === id); //узнаем какой именно пост изменяем, для этого id со звездой поста должен совпасть с id data

            
            const oldItem = data[index]; //конкретный пост в data
            const newItem = {...oldItem, [item]: !oldItem[item]} //создаем новый объект для замены старого с изменениями, [item] - не [], а способ задать ключ объекта, пример, !oldItem.important - если был false, то станет true и наоброт

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            //...data.slice(0, index) - это с 1-го поста до нужного, вставляем изменный пост, ...data.slice(index + 1) - сл. пост от нужного

            return{
                data: newArr
            };    
        });
    }

    onToggleImportant(id){
        this.onToggle(id, 'important');   
    }
    onToggleLiked(id){
        this.onToggle(id, 'like');
    }

    searchPost(items, term) {   //поиск поиска содержит items - данные всех постов, term - инфо того, что ищет польз.
        if(term.length === 0){  //если польз. ничего не внес или стер
            return items        //отражаются все данные(все посты)
        } else {
            return items.filter((item) => {  //filter -создаст новый массив c постами, начимаем их перебирать 
                return item.label.indexOf(term) > -1  //получем пост с нужной с инфо(label), ктр ищет польз.(indexOf(term)), > -1 -все посты, ктр подходят 
            });
        }
    }


    filterPost(items, filter) { //items - все посты
        if(filter === 'like') {                        
            return items.filter(item => item.like); //перебираем все посты и получаем новый[] с постами like = true
        } else {
            return items;    //если нет, будут отражаться все посты
        }
    }

    
    onUpdateSearch(term) {
        this.setState({
            term: term
        });
    }

    onFilterSelect(filter){ //фун-ия будет запускаться при клике на кнопку
        this.setState({      //и менять состояние в state на тот ктр кликнули
            filter: filter
        });
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(elem => elem.like).length; //filter- создает новый [] c лайками(true) и получаем их кол-во
        const allPosts = data.length; //кол-во всех постов 

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return(
            <AppBlock>
                <AppHeader
                    liked ={liked} //отлайканые посты
                    allPosts = {allPosts} //все посты 
                /> 
                <div className='search-panel d-flex'>
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter = {filter} //передаем из state инфо сюда, что активна кнопка all
                        onFilterSelect = {this.onFilterSelect} //Эта фун-ия будет запускаться при клике на кнопку
                    />
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDeletePost ={this.deleteItem}
                    onToggleImportant = {this.onToggleImportant} //отвечает за переключение звездочек
                    onToggleLiked = {this.onToggleLiked} //отвечает за переключение лайков
                /> 
                <PostAddForm 
                    onAdd = {this.addItem}/>
            </AppBlock>
            
        )
    }

}

//При нажатии на кнопку мусор срабатывает событие onClick, ктр запускает фун-ии и полс фун-ия заканивается на deleteItem


