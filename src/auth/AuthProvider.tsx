import React, { ReactElement, useEffect, useState } from 'react';
import firebase from '../firebase';


/** 
 * コンテクストは各階層で手動でプロパティを下に渡すことなく、コンポーネントツリー内でデータを渡す方法
 * createContextでコンテクストオブジェクトを生成する。ツリー内の最も近い上位に一致する
 * Providerから現在のコンテクストの値を読み取る
 */
export const AuthContext = React.createContext({});

interface AuthProps extends React.HTMLAttributes<Element> {
    children: React.ReactNode
    // add any custom props, but don't have to specify `children`
}

export const AuthProvider = ({ children }: AuthProps): ReactElement => {
    // Declare a new state variable, which we'll call "currentUser"
    const [currentUser, setCurrentUser] = useState<firebase.User |null | undefined>(undefined);

    const login = async (email: string, password: string, history: string[]) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password);
            history.push("/");
        }catch(error){
            alert(error);
        }
    };

    const signup = async (email: string, password: string, history: string[]) => {
        try{
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            history.push("/");
        }catch(error){
            alert(error);
        }
    };

    /**
     * useEffect:関数内コンポーネント内で副作用を実行することができる
     * レンダー後に何以下の処理をしないといけないことを伝える
     * デフォルトでは初回のレンダー時および毎回の更新時に呼び出される
     * 初回レンダリング時のみ副作用関数を実行させる場合、第二引数に空の配列[]を指定する
     * Similar to componentDidMount and componentDidUpdate
     */ 
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    },[]);

    return (
        /**
         * 全てのコンテクストオブジェクトはProviderコンポーネントが付属している
         * Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む
         */
        <AuthContext.Provider
          value={{
              login,
              signup,
              currentUser
          }}
        >
            {children}
        </AuthContext.Provider>
    );
}

