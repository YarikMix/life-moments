import {MomentTag} from "../../../../../utils/types";
import "./tag.sass"

const Tag = ({tag}:{tag:MomentTag}) => {
    return (
        <div className="tag-wrapper">
            <span>#{tag.name}</span>
        </div>
    )
}

export default Tag