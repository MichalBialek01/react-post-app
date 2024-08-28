import {useForm} from "react-hook-form"; //data validation
import * as yup from "yup"; //data validation
import {yupResolver} from "@hookform/resolvers/yup"; //data validation
import {addDoc, collection} from "firebase/firestore" //database - adding document in collection in firebase
import {auth, db} from "../../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom"; //database - reference to config

interface CreatePostData {
    title: string;
    description: string;
}


export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<CreatePostData>({
        resolver: yupResolver(schema)
    })


    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreatePostData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Title" {...register("title")}/>
            <p style={{color: "white"}}>{errors.title?.message}</p>
            <textarea style={{width: 200, height: 300}} placeholder="Description"{...register("description")}/>
            <p style={{color: "white"}}>{errors.description?.message}</p>
            <input type="submit" className="submitForm"/>
        </form>
    );
}