import { createContext, useContext, useState } from "react";

const EventsContext = createContext();

export const EventProvider = ({children}) => {
    const [filterItems, setFilterItems] = useState({kinds:"", categories:"", cities:""});
    const [hasChanged, setHasChanged] = useState(false);
    const [resetBtn, setResetBtn] = useState(false);
    const [lastModified, setLastModified] = useState();
    const [title, setTitle] = useState("Güncel Etkinlikler")

    const handleSelect = (e) => {
        setFilterItems({[e.target.name]: e.target.value});
        setHasChanged(true);
        setLastModified(e.target.name);
    }

    const handleClick = () => {
        setResetBtn(true);
        setHasChanged(false);
        setTitle("Güncel Etkinlikler");
        setFilterItems({kind:"", categories:"", cities:""});
    }

    const filterEvents = (data) => {
        if(hasChanged) {
            setTitle("Sonuçlar")
            if(lastModified === "kinds") {
                const events = data?.filter(item => item.format.slug.indexOf(filterItems["kinds"]) > -1);
                return events;
            }
            else if(lastModified === "categories") {
                const events = data?.filter(item => item.category.slug.indexOf(filterItems["categories"]) > -1);
                return events;
            }
            else if(lastModified === "cities") {
                const events = data?.filter(item => item.venue.city.slug.indexOf(filterItems["cities"]) > -1);
                return events;
            }
        }
        else {
            return data;
        }
    }

    return (
        <EventsContext.Provider value={{filterItems, handleSelect, handleClick, filterEvents, title}}>
            {children}
        </EventsContext.Provider>
    );
}

export const useEvent = () => useContext(EventsContext);