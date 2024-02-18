import "./tagListForm.sass"
import { IoIosCloseCircle } from "react-icons/io";
import {FaTags} from "react-icons/fa6";
import CustomButton from "../../../customButton/CustomButton";
import {useState} from "react";
import {usePostForm} from "../../../../hooks/posts/usePostForm";
import {pluralTagsRemaining} from "../../../../utils/plural";
import {warningMessage} from "../../../../utils/toasts";

const TagListForm = () => {

    const [tagValue, setTagValue] = useState("")

    const {tags, setTags} = usePostForm()

    const tagsMaxCount = 5


    const clearTags = (e) => {
        e.preventDefault()
        setTags([])
    }

    const deleteTag = (tag) => {
        const remainingTags = tags.filter(t => t !== tag)
        setTags(remainingTags)
    }

    const fetchTags = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault()

            if (tagValue) {

                if (tags.length >= tagsMaxCount) {
                    warningMessage("Вы не можете добавить больше пяти тэгов!")
                    return
                }

                setTags([...tags, tagValue])
                setTagValue("")
            }
        }
    }

    const tagsItems = tags.map((tag, index) => {
        return (
            <li key={index}>
                <span>{tag}</span>
                <IoIosCloseCircle onClick={() => deleteTag(tag)} />
            </li>
        )
    })

    return (
        <div className="tag-list-form-wrapper">
            <div className="tag-list-container">
                <div className="top-details">
                    <FaTags />
                    <h3>Тэги</h3>
                </div>
                <ul>
                    {tagsItems}
                    <input
                        type="text"
                        placeholder="Введите тэг"
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        onKeyDown={fetchTags}
                    />
                </ul>
                <div className="bottom-details">
                    <span>{pluralTagsRemaining(tagsMaxCount - tags.length)}</span>
                    <CustomButton onClick={clearTags}>Удалить все</CustomButton>
                </div>
            </div>
        </div>
    )
}

export default TagListForm