import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default function App() {
  // SHOWING HIDDEN FORM
  const [showAddFriend, setShowAddFriend] = useState(false);

  function toggleShowFriend() {
    setShowAddFriend((prev) => !prev);
  }

  // ADDING NEW FRIENDS

  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  // SELECTING FRIENDS

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend) {
    console.log(friend);
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList onSelection={handleSelection} friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={toggleShowFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplittBill friends={friends} />}
    </div>
  );
}

function FriendsList({ friends, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend onSelection={onSelection} friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <Button onClick={() => onSelection(friend)}>Select</Button>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>{friend.name} and you are even</p>}
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleOnSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    console.log(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");

    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleOnSubmit}>
      <span>Friend name</span>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Friends name"
      ></input>
      <span> Image URL</span>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
        placeholder="Image URL"
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplittBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <span>Bill value</span>
      <input type="text"></input>
      <span> Your expenses</span>
      <input type="text"></input>
      <span> Xs ecpenses</span>
      <input type="text" disabled></input>
      <span> Who is paying the bill ?</span>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>
    </form>
  );
}

// function Option({ friends }) {
//   return friends.map((friend) => (
//     <option value={friend.name}>{friend.name}</option>
//   ));
// }
