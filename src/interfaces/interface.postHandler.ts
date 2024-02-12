export interface InterfacePostHandler {
     addPost(title: string, author: string, description: string, published: string): any,
     getPostById(id: string) : any,
     getAllPost(): any,
     updatePostById(id: string, data: any): any,
     deletePostById(id: string): any
}