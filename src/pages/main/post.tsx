import {Post as IPost} from "./main";
import {addDoc, collection,query, where, getDocs} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";

interface Props {
    post: IPost
}
interface Like{
    userId: string
}

export const Post = (props: Props) => {
    const {post} = props

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef,where("postId","==",post.id))
    const [user] = useAuthState(auth);

    const [likes,getLikes] = useState<Like[] | null>(null);

    const hasUserLiked = likes?.find(like => like.userId === user?.uid);

    const addLike = async () => {
        await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id
        });

    };

    const getUserLikes = async () => {
        const data = await getDocs(likesDoc);
        getLikes(data.docs.map((doc) => ({ userId: doc.data().userId})))
    }

    useEffect(() => {
        getUserLikes()
    },[])


    return <div>
        <div className="title">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>{post.username}</p>
            <button onClick={addLike}> {hasUserLiked ?<>&#128078;</> :<>&#128077;</> }</button>
            { likes && <p>Likes: {likes?.length}</p>}
        </div>
    </div>
}