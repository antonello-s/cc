import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joke } from '../joke';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'home.page.html'
})
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  expanded:boolean = false;
  title = 'Chuk Norris Jokes'
  favourites:any[] = JSON.parse(localStorage.getItem('favourites')) || [];;
  joke:string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private http: HttpClient
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  getJokes() {
    this.http.get(`http://localhost:3000/jokes`)
    .subscribe((data:any)=>{
      const { joke } =  data.value;
      this.joke = joke;
    })
  };
  addToFavourites(joke:string){
    if(!joke){
      return alert(`Can't add an empty joke to favourite list!`)
    }
    const newJoke = new Joke(joke, this.favourites.length)
    const index = this.favourites.findIndex(ele => ele.joke === joke);
    const insertJoke = (newJoke:any) => {
      this.favourites.push(newJoke);
      localStorage.setItem('favourites', JSON.stringify(this.favourites) )
    }
    return index === -1 ? insertJoke(newJoke) : null;
  };
  removeFromFavourites(id:number){
    const decision = confirm('Are you sure?')
    if(decision) { 
      this.favourites = this.favourites.filter(joke => joke.id !== id);
      localStorage.setItem('favourites', JSON.stringify(this.favourites) )
    };
  };
  toggleShowDetails(id:number){
    //this.scrollOnExpand(id);
    const index = this.favourites.findIndex(ele => ele.id ===id);
    index > -1 ? 
      this.favourites[index].showDetails = !this.favourites[index].showDetails
    : null;
  }
  // scrollOnExpand(id:number){
  //   let scrollItem = document.getElementById(String(id));
  //   scrollItem.scrollIntoView(true);
  // }
};

