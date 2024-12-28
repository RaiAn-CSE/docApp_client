import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const ConversationPage = () => {
    const [conversations, setConversations] = useState([]);
    const { user } = useContext(AuthContext);

    console.log(conversations, "conversations");

    const userEmail = user?.email;

    console.log(userEmail, "userEmail form conversation page");

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get(`https://doc-app-server.vercel.app/conversations/${userEmail}`);
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        if (userEmail) {
            fetchConversations();
        }
    }, [userEmail]);

    return (
        <div className="container min-h-screen mx-auto p-4">
            <h2 className="text-2xl font-semibold text-center mb-6">Conversations</h2>
            {conversations.map((conversation, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4 nm_Container">
                    <h3 className="font-semibold text-lg mb-2">Participants:</h3>
                    <ul className="list-disc list-inside mb-4">
                        {conversation.participants.map((participant, i) => (
                            <li key={i} className="text-gray-700">
                                {participant.name} <span className="text-gray-500">({participant.email})</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-600">Created By: <span className="font-medium">{conversation.createdBy}</span></p>
                    <p className="text-gray-600">Post ID: <span className="font-medium">{conversation.postId}</span></p>
                    <div className="flex justify-end mt-4">
                        <Link to={`/conversations/${conversation.postId}`}>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                                Message
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default ConversationPage;
