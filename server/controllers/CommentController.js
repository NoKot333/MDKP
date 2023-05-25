import CommentModel from "../models/Comments.js"
import PostModel from "../models/Post.js"

export const create = async (req,res) => {
    try {
        const {postId,comment} = req.body
        const userId = req.userId;
        console.log(postId);
        console.log(comment);
        console.log(userId);
        
        if(!comment)
            return res.json({message: "Комментарий не может быть пустым"})
        
        const newComment = new CommentModel({text:comment,user:userId})
        await newComment.save()
        try {
            await PostModel.findByIdAndUpdate(postId, {
                $push:{comments: newComment._id},
            })
        } catch (error) {
            console.log(error)
        }

        res.json(newComment)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Что-то пошло не так."})
    }
};