import {DATA, PostType} from "../data";

type PostInitStateType = {
    allPosts:Array<PostType>
    bookedPosts:Array<PostType>
}

export enum POSTS_ACTION_TYPES {
    LOAD_POSTS = 'LOAD_POSTS',
    CHANGE_BOOKED = 'CHANGE_BOOKED'
}
export type PostsActionTypes = ReturnType<typeof loadPosts> | ReturnType<typeof changeBooked>
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
