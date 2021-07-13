import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('post.db')

export class DB {
    static init() {
        return new Promise((res, rej) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
                    [], res, (_, error) => {rej(error)
                        return true}
                )
            })
        })

    }
    static getPosts() {
        return new Promise((res, rej) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM posts',
                    [],
                    //@ts-ignore
                    (_, result) => res(result.rows._array),
                    (_, error) => {rej(error)
                        return true}
                )
            })
        })
    }
    static createPost(post:createPostType) {
        return new Promise((res:(value:number) => void, rej) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)`,
                    [post.text, post.date, 0, post.img],
                    (_, result) => res(result.insertId),
                    (_, error) => {rej(error)
                        return true}
                )
            })
        })
    }
    static updatePost(post: { id:number, booked:boolean }) {
        return new Promise((res, rej) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE posts SET booked = ? WHERE id = ?',
                    [post.booked ? 0 : 1, post.id], res, (_, error) => {rej(error)
                        return true}
                )
            })
        })
    }
    static removePost(id: number) {
        return new Promise((res, rej) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM posts WHERE id = ?',
                    [id], res, (_, error) => {rej(error)
                        return true}
                )
            })
        })
    }
}

export type createPostType = {
    img: string,
    text: string,
    date: string,
    booked: boolean
}
