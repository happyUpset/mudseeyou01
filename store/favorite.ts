import {defineStore} from 'pinia'
import {isArray} from "~/utils/types";


export const storeFavorite = defineStore('favorite', ()=> {

  const storage = {
    set(data) {
      // console.log(data);
      return localStorage.setItem('_bingoBallList',data)
    },
    get() {
      return localStorage.getItem('_bingoBallList')
    },
    reset() {
      return localStorage.removeItem('_bingoBallList')
    }
  };

  const favorites = ref(null)

  const favoriteDefault = {
    id: 0,
    title: '',
    bingoList: {
      number: [],
      guessOddEven: [],
      guessBigSmall: null,
      withSuperNumber: true,
      odds: null,
      multiPeriod: null,
    },
  }

  function getFavoriteList(){
    const getData = storage.get();
    if (isArray(getData)) {
      favorites.value = getData;
    }
  }

  function setFavoriteList(favoriteList){
    favorites.value = favoriteList;
    storage.set(favorites.value);
  }

  function newFavorite(item){
    favorites.value = favorites.value.concat([item]);
  }

  function update_favorite(item){
    let index = favorites.value.findIndex((value)=>{
      return item.id === value.id;
    });
    favorites.value[index] = item;
  }

  function delete_favorite(itemId){
    favorites.value = favorites.value.filter((value)=>{
      return itemId !== value.id;
    });
  }

  return {
    favorites,
    update_favorite,
    delete_favorite,
    getFavoriteList,
    setFavoriteList,
    newFavorite,
  }
})
