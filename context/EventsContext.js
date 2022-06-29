import { createContext, useContext, useState, useEffect } from "react";

const EventsContext = createContext();

export const EventProvider = ({children}) => {
    const [filterItems, setFilterItems] = useState({kinds:"", categories:"", cities:""});
    const [hasChanged, setHasChanged] = useState(false);
    const [resetBtn, setResetBtn] = useState(false);
    const [lastModified, setLastModified] = useState();

    const handleSelect = (e) => {
        setFilterItems({...filterItems, [e.target.name]: e.target.value});
        setHasChanged(true);
        setLastModified(e.target.name);
    }

    const handleClick = () => {
        setResetBtn(true);
        setHasChanged(false);
    }

    const filterEvents = (data) => {
        if(hasChanged) {
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

    // useEffect(() => {
    //     filterEvents();
    // }, [filterItems])

    return (
        <EventsContext.Provider value={{filterItems, handleSelect, handleClick, filterEvents}}>
            {children}
        </EventsContext.Provider>
    );
}

export const useEvent = () => useContext(EventsContext);