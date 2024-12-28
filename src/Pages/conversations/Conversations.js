import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsPersonCircle } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Conversations = () => {
    const { postId } = useParams() || {};  // Use postId to fetch relevant conversations
    const { user } = useContext(AuthContext);
    const { email: userEmail } = user || {};  // Logged-in user email
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState({});


    console.log("userEmail:", userEmail);
    console.log("postId:", postId);


    const fetchConversations = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/conversations`, {
                email: userEmail,
                postId,  // Fetch conversations associated with the postId
            });
            setConversations(response?.data?.conversations || []);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, [postId]);

    const getReceiverParticipant = (participants = []) =>
        participants.find((participant) => participant.email !== userEmail);

    const { register, reset, handleSubmit } = useForm();

    const addNewMessage = async (form) => {
        if (activeConversation?._id) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/conversations/messages`, {
                    conversationId: activeConversation._id,
                    message: form.message,
                    senderEmail: userEmail,
                });
                const newMessage = response?.data?.conversationMessage;
                if (newMessage) {
                    setActiveConversation((prevState) => {
                        const { conversationMessages } = prevState;
                        if (
                            !conversationMessages?.find((item) => item._id === newMessage?._id)
                        ) {
                            conversationMessages.push(newMessage);
                        }
                        return { ...prevState, conversationMessages };
                    });
                }
            } catch (error) {
                console.error("Error adding message:", error);
            }
        } else {
            alert("Please choose a conversation first!");
        }
        reset({ message: "" });
    };

    return (
        <div className="container mx-auto min-h-screen p-4">
            <h2 className="text-center text-2xl font-semibold mb-4">Conversation</h2>
            <div className="flex flex-wrap">
                {/* Sidebar for conversations list */}
                <div className="w-full md:w-1/4 p-2">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation?._id}
                            onClick={() => setActiveConversation(conversation)}
                            className="cursor-pointer border-b border-gray-300 p-3 hover:bg-gray-100 transition-colors rounded-lg mb-2"
                        >
                            <div className="flex items-center">
                                <BsPersonCircle className="text-2xl mr-2" />
                                <h5 className="font-medium text-gray-700">
                                    {getReceiverParticipant(conversation?.participants)?.name}
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main area for active conversation */}
                {activeConversation?._id && (
                    <div className="w-full md:w-3/4 p-2">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="border-b border-gray-300 mb-4 pb-2">
                                <h3 className="text-xl font-semibold flex items-center">
                                    <BsPersonCircle className="text-2xl mr-2" />
                                    {getReceiverParticipant(activeConversation?.participants)?.name}
                                </h3>
                                <span className="text-gray-500">
                                    Email: {getReceiverParticipant(activeConversation?.participants)?.email}
                                </span>
                            </div>

                            {/* Conversation messages */}
                            <div className="flex flex-col space-y-3 overflow-y-auto h-64 p-2 bg-gray-50 rounded-lg">
                                {activeConversation?.conversationMessages.map((conversationMessage) => (
                                    <div
                                        key={conversationMessage?._id}
                                        className={`${conversationMessage?.createdBy === userEmail
                                            ? "text-right"
                                            : "text-left"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block px-4 py-2 rounded-lg ${conversationMessage?.createdBy === userEmail
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-800"
                                                }`}
                                        >
                                            {conversationMessage?.message}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Message input form */}
                            <form onSubmit={handleSubmit(addNewMessage)} className="flex mt-4">
                                <input
                                    {...register("message", { required: true })}
                                    type="text"
                                    placeholder="Type your message here"
                                    className="w-full p-2 border rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition-colors"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Conversations;
