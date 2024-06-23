import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import HeaderAuthenticate from "../../Layouts/HeaderAuthenticated";
import Footer from "../../Layouts/Footer";
import { Divider } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../Components/common/Loader";

const ChatWindow = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jsonwebtoken");

    // Connect to WebSocket server
    const newSocket = io("http://localhost:3001", {
      query: { token }
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        if (message.chatId === selectedChat?.id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
    }
  }, [socket, selectedChat]);

  useEffect(() => {
    const getChatDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jsonwebtoken");
        const role = localStorage.getItem("role");
        if (role === "Organizer") {
          setIsOrganizer(true);
        } else {
          setIsOrganizer(false);
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };


        const response = await axios.get("http://localhost:3001/api/v1/chat/", config);
        setChats(response.data);
        setSelectedChat(response.data[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching chats:", error);
      }
    };

    getChatDetails();
  }, []);

  useEffect(() => {
    if (selectedChat && socket) {
      socket.emit("joinChat", selectedChat.id);
      const getMessages = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("jsonwebtoken");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`http://localhost:3001/api/v1/message/${selectedChat.id}`, config);
          setMessages(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching messages:", error);
        }
      };
      getMessages();
    } else {
      setMessages([]);
    }
  }, [selectedChat, socket]);

  const addMessage = async () => {
    try {
      const token = localStorage.getItem("jsonwebtoken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:3001/api/v1/message`,
        { message: newMessage, chatId: selectedChat.id },
        config
      );
      const newMessageData = response.data;
      setMessages([...messages, newMessageData]);
      setNewMessage("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding messages",
      });
      console.error("Error adding message:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <HeaderAuthenticate />
          <div className="bg-white px-16 mt-10">
            <div className="px-16 grid grid-cols-2 bg-[#C7ADCE]">
              <div className="bg-[#562595]">
                <div className="px-10 mt-5 box-border max-h-[50px] flex sm:flex-row justify-start">
                  <input
                    type="text"
                    placeholder="Search The Event"
                    className="max-h-[70px] p-3 text-lg w-full rounded-lg"
                  />
                </div>
                <div
                  style={{ maxHeight: "50vh" }}
                  className="grid mt-10 grid-rows px-16 text-white overflow-y-auto"
                >
                  {chats.length === 0 ? (
                    <div className="text-center text-lg p-10">
                      There are No Events in the List
                    </div>
                  ) : (
                    chats.map((chat, index) => (
                      <React.Fragment key={index}>
                        <button onClick={() => setSelectedChat(chat)}>
                          <div className="grid grid-cols-3 items-center ml-16">
                            <div className="text-2xl text-[#C7ADCE] font-extrabold text-center">
                              {chat.chatName}
                            </div>
                            <div className="text-center text-[#C7ADCE] font-extrabold text-2xl">
                              {(() => {
                                const dateString = chat.createdDate;
                                const date = new Date(dateString);
                                const month = date.toLocaleString("default", {
                                  month: "short",
                                });
                                const day = date.getDate();
                                return `${month} ${day}`;
                              })()}
                            </div>
                            <div className="flex justify-center">
                              <img
                                src={chat.chatImg}
                                alt=""
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  cursor: "pointer",
                                }}
                                className="rounded-full"
                              />
                            </div>
                          </div>
                        </button>
                        <Divider style={{ borderColor: "white" }} />
                      </React.Fragment>
                    ))
                  )}
                </div>

                {isOrganizer && (
                  <div className="text-white text-right">
                    <Link to={"/add-chat"}>
                      <button className="text-5xl p-16">+</button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="bg-white grid grid-rows">
                <div className="p-2 bg-[#EEF1F4] flex sm:flex-row justify-start">
                  <img
                    src={
                      selectedChat?.chatImg
                        ? selectedChat?.chatImg
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                    className="rounded-full"
                    style={{ width: "70px", height: "70px", cursor: "pointer" }}
                  />
                  <div className="grid ml-3 grid-rows items-center">
                    <span className="text-lg font-extrabold">
                      {selectedChat?.chatName}
                    </span>
                    <span className="text-sm">
                      {selectedChat?.chatDescription}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-3 h-[50vh] overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="text-center p-16 text-lg">
                      There are No Messages
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div key={index}>
                        <div className="flex sm:flex-row items-center justify-start">
                          <img
                            src={msg.userImg}
                            alt=""
                            className="rounded-full"
                            style={{
                              width: "70px",
                              height: "70px",
                              cursor: "pointer",
                            }}
                          />
                          <div className="grid ml-3 grid-rows items-center">
                            <span className="text-lg font-extrabold">
                              {msg.userName}
                            </span>
                            <span className="text-sm">{msg.message}</span>
                          </div>
                        </div>
                        <Divider style={{ borderColor: "black" }} />
                      </div>
                    ))
                  )}
                </div>
                
                <div className="flex items-center justify-between p-3 border-t-2 border-gray-300">
                {isOrganizer ? (
                  <>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full px-3 py-2 rounded-lg"
                    />
                    <button
                      onClick={addMessage}
                      className="bg-[#562595] text-white px-4 py-2 ml-3 rounded-lg"
                    >
                      Send
                    </button>
                  </>
                ) : (
                  <input
                    type="text"
                    value="Do not allow messages"
                    readOnly
                    className="w-full px-3 py-2 rounded-lg bg-gray-200"
                  />
                )}
              </div>

              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
