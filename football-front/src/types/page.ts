interface PageProps {
    name: string,
    url: string,
}

export const Pages: PageProps[] = [
    {
        name: "Torneos",
        url: "/tournaments"
    },
    {
        name: "Equipos",
        url: "/teams"
    },
    {
        name: "Partidos",
        url: "/matches"
    },
]
