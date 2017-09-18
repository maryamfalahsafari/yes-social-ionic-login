import { Component } from '@angular/core';
import { NavController,NavParams,LoadingController  } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private fb: Facebook,
              private googlePlus: GooglePlus, 
              public navParams: NavParams) {
  }
  info = { username : null , provider : null };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.info.username = this.navParams.get('username');
    this.info.provider = this.navParams.get('provider');
    //alert(JSON.stringify(this.info));
    
  }
  logout(){
    var self = this;
    if (this.info.provider == 'facebook'){
      this.fb.logout().then(function(response1){
        self.navCtrl.setRoot(LoginPage);
      });
    } else if (this.info.provider == 'google'){
      this.googlePlus.logout().then(function(response2){
        self.navCtrl.setRoot(LoginPage);
      });
    }else{
      self.navCtrl.setRoot(LoginPage);
    }
    

  }



}
