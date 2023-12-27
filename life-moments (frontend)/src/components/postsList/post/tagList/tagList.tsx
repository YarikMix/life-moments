import {MomentTag} from "../../../../utils/types";
import Tag from "./tag/tag";
import "./tagList.sass"

const TagList = ({tags}:{tags:MomentTag[]}) => {

    const items = tags.map((tag) => {
        return <Tag tag={tag} key={tag.id}/>
    })

    return (
        <span className="tag-list-wrapper">
            {items}
        </span>
    )
}

export default TagList