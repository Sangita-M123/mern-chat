import Conversation from '../models/conversationmodel.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId ,io} from '../socket/socket.js';
export const sendMessage = async (req, res) =>{
  try {
    const { message} = req.body;
    const {id: receiverId } = req.params;
     const senderId= req.user._id;  
    // const senderId = req.body.user;  
    //const senderId="65eaf103fb11a19dbc3fdb73"

    let conversation=await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    })
    if(!conversation){
      conversation=await  Conversation.create({
        participants:[senderId,receiverId]
      })
      
    }
    const newMessage=new Message({
      senderId,
      receiverId,
      message,
    })
    if(newMessage){
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(),newMessage.save()])
    //res.status(201).json(newMessage)
    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendmessage ",error.message)
    res.status(500).json({error:"something went wrong"})
  }
}
export const getMessages = async (req, res) =>{
  try {
    const {id:userToChatId}=req.params;
     const senderId = req.user._id;
   // const senderId = "65ec8f3db7a26514a771afd3";
    const conversation=await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages")
    if(!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    
    res.status(200).json(messages)
  } catch (error) {
    console.log("error in getMessages ",error.message)
    res.status(500).json({error:"something went wrong"})
  }
}