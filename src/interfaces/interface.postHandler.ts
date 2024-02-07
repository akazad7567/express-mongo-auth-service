export interface InterfacePostHandler {
     addPost(title: string, author: string, description: string, published: string): any,
     getPostById(id: number) : any,
     getAllPost(): any,
     updatePostById(id: number, data: any): any,
     deletePostById(id: string): any
}