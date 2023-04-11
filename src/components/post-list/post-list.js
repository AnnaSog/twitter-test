import React from 'react';
import './post-list.css';

import PostListItem from '../post-list-item';

const PostList = ({posts, onDeletePost, onToggleImportant, onToggleLiked}) => { //эти props получаем из app.js

    const elements = posts.map((item) =>{  //map-проходит по каждому [], трансформирует и записывает как новый эл.

        // Простой способ проверки на объект + содержится ли в нем информация
        if ( typeof item === 'object' && isEmpty(item) ){ 

            const {id, ...itemProps} = item;
            return (
                <li key = {id} className='list-group-item'>
                    <PostListItem 
                        {...itemProps} 
                        onDelete={() => onDeletePost(id)} //props с фун-ией по удалению постов передается в кнопку в PostListItem
                        onToggleImportant = {() => onToggleImportant(id)} //теперь каждый пост знает об этих обработчиках событий
                        onToggleLiked = {() => onToggleLiked(id)}
                    />
                </li>
            )
            
            // return(
            //     <li className='list-group-item'>
            //        <PostListItem 
                //        label={item.label} 
                //        important = {item.important}/>  
            //     </li>
            // )
        }
    });

    function isEmpty(obj) {
        for(let key in obj)
        {
            return true;
        }
        return false;
    }

    return(
        <ul className='app-list list-group'>
            {elements}
        </ul>
    )
}

//important -звездочка, если не указан, то поумолчанию false

export default PostList;