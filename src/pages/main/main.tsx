import {getDocs, collection} from "firebase/firestore";
import {db} from "../../config/firebase";
import {useEffect, useState} from "react";
import { Post} from "./post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}


export const Main = () => {
    const postsRef = collection(db, "posts") //Referencja do bazy danych

    const [postList, setPostLists] = useState<Post[] | null>(null); //useState dla listy postów

    const getPosts = async () => {
        const data = await getDocs(postsRef); // metoda czekająca na pobranie danych (setPostList )
        setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);// Musimy tutaj podać as, bo React nie wie jaki typ będzie zwracany
    }


    useEffect(() => {
        getPosts();
    },[])

    //UseEffect, który jest uruchamiany raz podczas ładowani strony

    return (
        <div className="main-container">
            {postList?.map((post) => (
                <Post post={post}/>
            ))}
        </div>
    );


}