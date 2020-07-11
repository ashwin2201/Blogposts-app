import createDataContext from "./createDataContext";
import BlogPostForm from "../components/BlogPostForm";
import jsonServer from "../api/jsonServer";
import jsonserver from "../api/jsonServer";

const BlogReducer = (state, action) => {
    switch(action.type) {
        // case "add_blogpost":
            // return [...state, { id: Math.floor(Math.random()*99999), title: action.payload.title, content: action.payload.content }];
        case "delete_blogpost":
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case "edit_blogpost":
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        case "get_blogposts": // from api so its the total list of blogposts and its the total source of truth
            return action.payload;
        default:
            return state;
    }
};

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        // response.data === []
        dispatch({ type: "get_blogposts", payload: response.data });
    };
};


const addBlogPost = (dispatch) => { // Object { type: , payload }
    return async (title, content, callback) => {
       await jsonServer.post('/blogposts', { title, content });

       if (callback) {
           callback();
       }
    };
};

const deleteBlogPost = (dispatch) => {
     return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: "delete_blogpost", payload: id });
     };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });
        dispatch({ type: "edit_blogpost", payload: { id, title, content }});
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    BlogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts }, 
    []
);




