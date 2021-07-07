import {DATA, PostType} from "../data";

type PostInitStateType = {
    allPosts:Array<PostType>
    bookedPosts:Array<PostType>
}

export enum POSTS_ACTION_TYPES {
    LOAD_POSTS = 'LOAD_POSTS',
    CHANGE_BOOKED = 'CHANGE_BOOKED',
    REMOVE_POST = 'REMOVE_POST',
    ADD_POST = 'ADD_POST'
}
export type PostsActionTypes = ReturnType<typeof loadPosts>
    | ReturnType<typeof changeBooked>
    | ReturnType<typeof removePost>
    | ReturnType<typeof addPost>
const postInitialState = {
    allPosts: [],
    bookedPosts: []
}

export const postReducer = (state: PostInitStateType = postInitialState, action: PostsActionTypes) => {
    switch (action.type) {
        case POSTS_ACTION_TYPES.LOAD_POSTS:
            return {...state, allPosts: action.payload,
                bookedPosts: action.payload.filter(p => p.booked) }
        case POSTS_ACTION_TYPES.CHANGE_BOOKED:
            const allPosts = state.allPosts.map(p => p.id === action.id ? {...p,booked:!p.booked} : p)
            return {...state, allPosts, bookedPosts: allPosts.filter(p => p.booked)}
        case POSTS_ACTION_TYPES.REMOVE_POST:
            return {...state, allPosts: state.allPosts.filter(p => p.id !== action.id),
                bookedPosts: state.bookedPosts.filter(p => p.id !== action.id) }
        case POSTS_ACTION_TYPES.ADD_POST:
            return {...state, allPosts: [{...action.payload},...state.allPosts]}
        default:
            return state
    }
}

export const loadPosts = () => {
    return {type:POSTS_ACTION_TYPES.LOAD_POSTS, payload:DATA} as const
}
export const changeBooked = (id:string) => {
    return {type: POSTS_ACTION_TYPES.CHANGE_BOOKED, id} as const
}
export const removePost = (id:string) => {
    return {type:POSTS_ACTION_TYPES.REMOVE_POST, id} as const
}
export const addPost = (data:PostType) => {
    return {type:POSTS_ACTION_TYPES.ADD_POST, payload:data} as const
}
