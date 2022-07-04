import { useEffect } from "react";
import Header from "../../components/header";

export default function Event({data}) {
    console.log(data.slug);
    
    useEffect(() => {
        window.location.hash = `${data.slug}`;
    }, []);

    console.log(data);  
    return (
    <div>
        <Header />
    </div>
    );
}

export async function getStaticPaths() {
    const response = await fetch("https://backend.etkinlik.io/api/v2/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Etkinlik-token": "92510ee702346c171e6e27c6566af993",
        }
    });

    const data = await response.json();
    const paths = data.items.map(item => (
        {params: {id: String(item.id)}}
    ));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({params}) {
    console.log(params.id);
    const response = await fetch(`https://backend.etkinlik.io/api/v2/events/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Etkinlik-token": "92510ee702346c171e6e27c6566af993",
        },
      });
    const data = await response.json();

    return {
        props: {data},
    };

}