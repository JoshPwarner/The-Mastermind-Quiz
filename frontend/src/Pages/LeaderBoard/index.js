import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./leaderboardstyles.css";
import image from "../../images/leaderboard.jpg";

const LeaderBoard = () => {
    const navigate = useNavigate();
    const [leaderBoard, setLeaderBoard] = useState([]);

    useEffect(() => {
        fetch("https://obscure-brushlands-72357.herokuapp.com/scoreBoard")
          .then((res) => res.json())
          .then((data) => setLeaderBoard(data));
      }, []);

      const leaderBoardDisplay = leaderBoard.map((leaderboard, i) => {
        return (
          <div
            className="leaderboard-score"
            role="leaderboard-score"
            key={i}
            style={{ display: "flex" }}
          >
            <p>{leaderboard.username} </p>
            <p> {leaderboard.score}</p>
          </div>
        );
      });

      const navigateHome = () => {
        navigate("/");
        window.location.reload();
      };
    return (
        
     <>
     <div className="leaderboardbgimg">
        <div className="leaderboard-display">
         <button  className="lbbtn" aria-label="leaderboard-back-button" id="leaderboard-back-button"  onClick={navigateHome}>
            Back to homepage
         </button>
         <h2  className="lbHeading" role="leaderboard-heading">Hall Of Fame</h2>
         
            <div className="lbTable" role="leaderboard-table">
                <p>Username</p>
                <p>Score</p>

                </div>

            <div className="leaderboard-container">
                {leaderBoardDisplay}
            </div>
        </div>
        </div>
     </>
        
    );
}

export default LeaderBoard;