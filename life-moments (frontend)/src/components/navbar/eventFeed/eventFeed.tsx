import * as React from 'react'
import "./eventFeed.sass"
import EventMoment from "./eventMoment/eventMoment";
import {AiOutlineHeart} from "react-icons/ai";
import {useModal} from "/src/hooks/other/useModal";
import {useState} from "react";


const EventFeed = () => {

	const { modalRef, buttonRef, isOpen, setIsOpen } = useModal();

	const [eventsCount, setEventCount] = useState<number>(3)

	const events = Array.from({length: 100}, (item, index) =>
		<EventMoment key={index} />
	)

	const scrollHandler = (e) => {
		if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 100) {
			setEventCount(eventsCount => eventsCount + 2)
		}
	}

	return (
		<div>
			<div ref={buttonRef}>
				<AiOutlineHeart className={"menu-icon event-feed-btn " + (isOpen ? "active" : "")} onClick={() => setIsOpen(!isOpen)}  />
			</div>

			<div className={"event-feed-wrapper " + (isOpen ? "open" : "")} ref={modalRef} onScroll={scrollHandler}>

				{events.splice(0, eventsCount)}

			</div>
		</div>
	)
}

export default EventFeed;