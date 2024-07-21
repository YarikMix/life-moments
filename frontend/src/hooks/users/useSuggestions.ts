import {useState} from "react";
import {I_User} from "utils/types.ts";
import {api} from "modules/api.ts";

export function useSuggestions() {
    const [suggestedUsers, setSuggestedUsers] = useState<I_User[]>([])

    const fetchSuggestedUsers = async (user_id:string) => {
        const {data} = await api.get(`users/${user_id}/suggested_users/`)
        setSuggestedUsers(data)
    }

    return {
        suggestedUsers,
        fetchSuggestedUsers
    }
}