import React from "react";
import {Dispatch} from "redux";
import {createPostType, DB} from "../db";
import * as FileSystem from 'expo-file-system';

type PostInitStateType = {
    allPosts: Array<PostType>
    bookedPosts: Array<PostType>
    loading:boolean
}
export type PostType = {
    id: number,
    img: string,
    text: string,
    date: string,
    booked: boolean
}
export type DataType = Array<PostType>

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
    bookedPosts: [],
    loading:true
}

export const postReducer = (state: PostInitStateType = postInitialState, action: PostsActionTypes) => {
    switch (action.type) {
        case POSTS_ACTION_TYPES.LOAD_POSTS:
            return {
                ...state, allPosts: action.payload,
                bookedPosts: action.payload.filter(p => p.booked),
                loading:false
            }
        case POSTS_ACTION_TYPES.CHANGE_BOOKED:
            const allPosts = state.allPosts.map(p => p.id === action.id ? {...p, booked: !p.booked} : p)
            return {...state, allPosts, bookedPosts: allPosts.filter(p => p.booked)}
        case POSTS_ACTION_TYPES.REMOVE_POST:
            return {
                ...state, allPosts: state.allPosts.filter(p => p.id !== action.id),
                bookedPosts: state.bookedPosts.filter(p => p.id !== action.id)
            }
        case POSTS_ACTION_TYPES.ADD_POST:
            return {...state, allPosts: [{...action.payload}, ...state.allPosts]}
        default:
            return state
    }
}
export const loadPostsThunk = () => async (dispatch: Dispatch) => {
    try {
        const posts = await DB.getPosts()
        console.log(posts)
        if (posts) {
            dispatch(loadPosts(posts as DataType))
        }
    } catch (e) {
        console.log(e.toString())
    }
}
export const addPostThunk = (data: createPostType) => async (dispatch: Dispatch) => {
    const fileName = data.img.split('/').pop()
    const newPath = FileSystem.documentDirectory! + fileName!
    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: data.img
        })
    } catch (e) {
        console.log(e.toString())
    }
    const newData: createPostType = {...data, img: newPath}

    try {
        const id = await DB.createPost(newData)
        const post: PostType = {...newData, id}
        dispatch(addPost(post))
    } catch (e) {
        console.log(e.toString())
    }
}
export const changeBookedThunk = (post: { id: number, booked: boolean }) => async (dispatch: Dispatch) => {
    try {
        await DB.updatePost(post)
        dispatch(changeBooked(post.id))
    } catch (e) {
        console.log(e.toString())
    }
}
export const removePostThunk = (id:number) => async (dispatch: Dispatch) => {
    try {
        await DB.removePost(id)
        dispatch(removePost(id))
    } catch (e) {
        console.log(e.toString())
    }
}
export const loadPosts = (DATA: DataType) => {
    return {type: POSTS_ACTION_TYPES.LOAD_POSTS, payload: DATA} as const
}
export const changeBooked = (id: number) => {
    return {type: POSTS_ACTION_TYPES.CHANGE_BOOKED, id} as const
}
export const removePost = (id: number) => {
    return {type: POSTS_ACTION_TYPES.REMOVE_POST, id} as const
}
export const addPost = (data: PostType) => {
    return {type: POSTS_ACTION_TYPES.ADD_POST, payload: data} as const
}
