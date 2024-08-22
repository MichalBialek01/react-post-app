import {useForm} from "react-hook-form"; //data validation
import * as yup from "yup";  //data validation
import {yupResolver} from "@hookform/resolvers/yup"; //data validation
import {addDoc,collection} from "firebase/firestore" //database - adding document in collection in firebase
import {auth, db} from "../../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"; //database - reference to config

interface CreatePostData {
    title: string;
    description: string;
}


export const CreateForm = () =>{
const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),
    })

    const {register,
        handleSubmit,
        formState:{errors}} = useForm<CreatePostData>({
        resolver: yupResolver(schema)
    })


    const postsRef = collection(db,"post");

    const onCreatePost = async (data: CreatePostData) => {
        await addDoc(postsRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        });

    };

    return (<form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title" {...register("title")}/>
        <p style={{ color: "red" }}>{errors.title?.message}</p>
        <textarea placeholder="Description"{...register("description")}/>
        <p style={{color: "blue"}}>{errors.description?.message}</p>
        <input type="submit"/>
    </form>);
}