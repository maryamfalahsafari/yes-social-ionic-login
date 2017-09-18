import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Service } from '../../providers/service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private _service : Service,
              private fb: Facebook,
              private googlePlus: GooglePlus) {
  }

  loginData = {};

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  facebook = function(){
    let self = this;
    let loading = this.loadingCtrl.create({
      content: 'Loding User Info...'
    });

    loading.present();

    this.fb.login(["public_profile","email"])
    .then(function(response){
      //let userId = response.authResponse.userID;

      self.fb.api("/me?fields=name,gender,email", new Array<string>())
      .then(function(user) {
        self.info = user;
        self._service.getYesIdBySocialId('facebook',self.info.email)
        .subscribe(result => 
          {
            if (result.success == true){
              self.navCtrl.setRoot(HomePage,{ email : self.info.email , username : result.yesId , provider : 'facebook' });
            }else{
              alert(result.message);
            }
          },error => this.errorMessage = <any>error,
          () => { 
            loading.dismiss();          
          });
        //user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
      },function(error){
        alert(JSON.stringify(error));
        loading.dismiss();
      });
    }, function(error){
      alert(JSON.stringify(error));
      loading.dismiss();
    });

  }
  google = function(){
    let self = this;
    let loading = this.loadingCtrl.create({
      content: 'Loading User Info...'
    });

    loading.present();
    this.googlePlus.login({})
    .then(res => 
      {
        self.info = res;
        self._service.getYesIdBySocialId('google',self.info.email)
        .subscribe(result => 
          {
            if (result.success == true){
              self.navCtrl.setRoot(HomePage,{ email : self.info.email , username : result.yesId , provider : 'google' });
            }else{
              alert(result.message);
            }
          },error => this.errorMessage = <any>error,
          () => { 
            loading.dismiss();          
          });
      })
    .catch(err => {
      alert(JSON.stringify(err));
      loading.dismiss();
      
    });
  }
  login = function(){
    var self = this;
    let loading = this.loadingCtrl.create({
      content: 'Loading User Info...'
    });

    loading.present();
    this._service.login(this.loginData)
      .subscribe(result => 
      {
        self._service.decodeToken(result.token)
        .subscribe(decodeResult => 
          {
            if (decodeResult.success == true){
              self.navCtrl.setRoot(HomePage,{ email : decodeResult.info.email , username : decodeResult.info.username , provider : 'custom' });
            }else{
              alert(result.message);
            }
          },error => this.errorMessage = <any>error,
          () => { 
            loading.dismiss();
          });
      },error => this.errorMessage = <any>error,
      () => { 
      });
  }
  


  // facebook_ = function(){
  //   this.fb.login(['public_profile', 'email'])
  //   .then((res: FacebookLoginResponse) => 
  //       {
  //         this.getInfoFromToken(res.authResponse.accessToken);
  //         //this.navCtrl.setRoot(HomePage,{ token : res.authResponse.accessToken });
  //       }
  //     )
  //   .catch(e => console.log('Error logging into Facebook', e));
  // }


  // getInfoFromToken = function(token){
  //   var self = this;
  //   this._service.facebook(token) 
  //   .subscribe(result => 
  //    {
  //       this.info = result;
  //       this.navCtrl.setRoot(HomePage,{ email : this.info.email });
        
  //    },error => this.errorMessage = <any>error,
  //    () => { });
  // }


  // this._service.getYesIdBySocialId('facebook',self.info.email)
        // .subscribe(data => 
        // {
        //   alert('Hi !!!!');
        //   self.info.username = data.data.yesId;
        //   alert(JSON.stringify(data));

        // },error => this.errorMessage = <any>error,
        // () => { });
       //alert(JSON.stringify(this.info));
  
 


}
