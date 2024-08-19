import './Card.css'
import profilePic from "./assets/profile.jpg"

function Card() {
    return (
        <div className="card">
            <img className="card_image" id="profile_pic" src={ profilePic } alt="profile picture"></img>
            <h2 className="card_title">Martin's Code</h2>
            <p className="short-para">I code everyday then become better than better.</p>
        </div>
    );
}

export default Card;

