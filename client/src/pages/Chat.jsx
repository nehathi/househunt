import React from "react";

const Chat = () => {
  return (
    <div className="container mt-5">
      <h2>Chat with Property Owner</h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          height: "400px",
          overflowY: "auto",
          marginTop: "20px",
        }}
      >
        <p><strong>Owner:</strong> Hello 👋</p>
        <p><strong>You:</strong> Hi, I'm interested in this property.</p>
      </div>

      <div className="mt-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
        />
        <button className="btn btn-primary ms-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;