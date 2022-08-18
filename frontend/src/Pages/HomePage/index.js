import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHost, setPlayer, setID } from "../../actions/userType";
import image from '../../images/img2.jpg';
import image2 from '../../images/scroll-png.png';
import { socket } from "../../Socket/index.js";
import './homePagestyles.css';



const HomePage = () => {
    // const [categoryList, setCategoryList] = useState({});
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //no of users online, default is 0
    const [playerCount, setPlayerCount] = useState(0);
    const [error, setError] = useState(undefined);
    //username form
    const [usrInput, setUsrInput] = useState(undefined);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState(undefined);
    //To show all connected users
    const [allUsers, setAllUsers] = useState([]);
  
    //On load, socket will listen for number of users being emitted from socket server
    useEffect(() => {
      socket.on("users", (users) => setPlayerCount(users));
      socket.on("new user", (allUsers) => {
        setAllUsers(allUsers);
      });
    }, []);
  
    socket.on("no room", (msg) => {
      setError(msg);
    });
  
    useEffect(() => {
      socket.on("assign-id", (id) => dispatch(setID(id)));
      //Emits to server the set username when username changes
      socket.emit("join server", username);
    }, [username]);
  
    const renderUser = (user, i) => {
      return <p key={i}>{user.username}</p>;
    };
  
    const handleInput = (e) => {
      setError(undefined);
      setUsrInput(e.target.value);
    };
  
    //Handles creating room from form
    const handleCreate = (e) => {
      e.preventDefault();
      const player = usrInput;
      setUsername(player);
      //Error handling for form
      if (player === undefined) {
        setError("Please enter a username to join the quiz");
      } else if (room === undefined) {
        setError("To create a room or join a game, please set a room name");
      } else {
        socket.emit("check-room", room, (res) => {
          if (res.code === "success") {
            setRoom(room);
            dispatch(setHost(player, room));
            navigate("/game");
          } else {
            setRoom(undefined);
            console.warn(error);
            setError(res.message);
          }
        });
      }
    };
  
    const handleJoin = (e) => {
      e.preventDefault();
      setError("");
      const player = usrInput;
      setUsername(player);
      if (player === undefined) {
        setError("Please, Enter Valid Username and Roomname.");
      } else if (room === undefined){
        setError("You need to create room or give an existing name");
      } else {
        const config = {
          room: room,
          username: player,
          id: socket.id,
        };
        socket.emit("join-room", config, (res) => {
          if (res.code === "success") {
            setRoom(room);
            dispatch(setPlayer(player, room));
            navigate("/waitingroom");
          } else {
            setRoom(undefined);
            setError(res.message);
          }
        });
      }
    };
  
    const handleRoomInput = (e) => {
      setError("");
      setRoom(e.target.value);
    };
  
    const renderJoin = () => {
      let toggle = "join";
      let joinText = "Join Room";
      if (playerCount < 2) {
        toggle = "disabled";
        joinText = "No rooms to join";
      }
      return (
        <>
          <button
            type="submit"
            id="join"
            className={toggle}
            name="joinQuiz"
            value={joinText}
            onClick={handleJoin}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            JOIN QUIZ
          </button>
        </>
      );
    };
  
    const leaderBoard = () => {
      navigate("/leaderboard");
    };

    const aboutUs = () => {
      navigate("./aboutUsPage");
    };
  
    return (
      <>
        <div id="welcome">
        <img className="bgImg" src={image} /> 
        <div className="heading"> <p id="leaderboardIcon" onClick={leaderBoard}>
            SCOREBOARD 
          </p></div>
          <div className="headingh1"><h1> The Mastermind Quiz </h1></div>
        <img className="scrollPage" src={image2} />
         <div className="form">
          <form role="form" className="form1" >
            {/*<label htmlFor="username">Username</label>*/}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="PLAYER NAME"
              value={usrInput || ""}
              onChange={handleInput}
            />
          </form>
          <form autoComplete="off"  className="form2">
           {/*<label htmlFor="roomName">Room Name</label>*/}
            <input
              type="text"
              id="roomName"
              name="roomName"
              placeholder="ROOM NAME"
              value={room || ""}
              onChange={handleRoomInput}
            />
          
            <div className="button-container">
            <button
              id = "join"
              type="submit"
              name="newQuiz"
              className="newQuiz"
              value="New Game"
              onClick={handleCreate}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              NEW GAME
            </button>
    
            {renderJoin()}
            </div>
          </form>
          </div>
          {/* Shows number of Players online */}
          <div className="footer">
            {playerCount <= 0
              ? "No Players Online"
              : `Players Online: ${playerCount}`}
            {error && <p className="error">{error}</p>}
          </div>
          <div className="footer2">
            {allUsers.length <= 0
              ? "No Players Online ☹️ "
              : `Players Online: ${playerCount}` && <div className="usersOnline">{allUsers.map(renderUser)}</div>}
          </div>
        </div>
       <div className="aboutGame" onClick={aboutUs}>How To Play</div>
        </>
      );
    };
    
    export default HomePage;
