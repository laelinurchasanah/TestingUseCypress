import { useState } from "react";
import React from "react";


export default function LoginForm() {
  const [userList, setUserList] = useState([]);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchUserList = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET"
    });
    const userRes = await response.json();
    setUserList(userRes);
  };

  const postUserList = async () => {
    if (
      userForm.name === "" &&
      userForm.email === "" &&
      userForm.phone === ""
    ) {
      setErrorMessage("Masukan data user!");
      return;
    } else {
      setErrorMessage(null);
    }
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone
      })
    });
    const userRes = await response.json();
    setUserId(userRes.id);
  };

  const changeForm = (e, type) => {
    if (type === "name") {
      setUserForm({
        ...userForm,
        name: e.target.value
      });
    }
    if (type === "email") {
      setUserForm({
        ...userForm,
        email: e.target.value
      });
    }
    if (type === "phone") {
      setUserForm({
        ...userForm,
        phone: e.target.value
      });
    }
  };

  return (
    <div className="login-form">
      <div>
        <label>Nama</label>&nbsp;
        <input
          className="name-input"
          placeholder="Tolong masukan nama"
          onChange={(e) => changeForm(e, "name")}
        />
      </div>
      <div>
        <label>Email</label>&nbsp;
        <input
          className="email-input"
          placeholder="Tolong masukan email"
          onChange={(e) => changeForm(e, "email")}
        />
      </div>
      <div>
        <label>Telpon</label>&nbsp;
        <input
          className="phone-input"
          placeholder="Tolong masukan telpon"
          onChange={(e) => changeForm(e, "phone")}
        />
      </div>
      <br />
      <button className="post-user-button" onClick={postUserList}>
        Buat User
      </button>
      <br />
      <br />
      {userId && <div className="success-response">Berhasil membuat user!</div>}
      {errorMessage && (
        <div className="fail-response" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
      <br />
      <br />
      <button className="fetch-user-button" onClick={fetchUserList}>
        Ambil User
      </button>
      {userList.length > 0 &&
        userList.map((user, idx) => (
          <div key={`user-${idx}`}>
            <hr />
            <div className={`user-${user.id}`}>
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
              <div className="user-phone">{user.phone}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
