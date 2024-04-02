import moongoose from "mongoose";
const conversationSchema = new moongoose.Schema({
  participants:[
    {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  messages:[
    {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Message",
      default:[],
    }
  ]
},{ timestamps: true})

const Conversation = moongoose.model("Conversation",conversationSchema);
export default Conversation;