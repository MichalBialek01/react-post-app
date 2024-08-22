import {useForm} from "react-hook-form";
import * as yup from "yup";
import {Simulate} from "react-dom/test-utils";
import {yupResolver} from "@hookform/resolvers/yup";

interface CreatePostData {
    title: string;
    description: string;
}


export const CreateForm = () =>{

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),
    })

    const {register,handleSubmit} = useForm<CreatePostData>({
        resolver: yupResolver(schema)
    })

    const onCreatePost  = (data: CreatePostData) => {

    }

    return (<form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title" {...register("title")}/>
        <textarea placeholder="Description"{...register("description")}/>
        <input type="submit"/>
    </form>);
}