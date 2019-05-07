const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "",
            authDomain: "whatsapp-clone-72fbe.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-72fbe.firebaseio.com",
            projectId: "whatsapp-clone-72fbe",
            storageBucket: "whatsapp-clone-72fbe.appspot.com",
            messagingSenderId: "1008860183655"
        };

        this.init();

    }

    init(){
        
        if(!this._initialized){

            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            this._initialized = true;

        }

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                    .then(result =>{

                        let token = result.credential.accessToken;
                        let user = result.user;

                        s(user, token);

                    })
                    .catch(err=>{
                        f(err);
                    });

        })

    }

}
