import "./eventMoment.sass"
import image from "/src/assets/image.jpg"
import avatar from "/src/assets/avatar.jpg"

const EventMoment = () => {

	return (
		<div className="event-moment-wrapper">

			<div className="event-moment-left">

				<img src={avatar} className="user-avatar" />

			</div>

			<div className="event-moment-right">

				<div className="event-info-container">

					<span className="top-label">
						<span className="username">YarikMix</span> поставил(-а) вашему фото
					</span>

					<span className="bottom-label">
						<span className="event-type">Нравится, </span>
						<span className="time-left">21ч.</span>
					</span>

				</div>


				<div className="event-moment-image-container">

					<img src={image} className="event-moment-image"/>

				</div>

			</div>


		</div>
	)
}

export default EventMoment;