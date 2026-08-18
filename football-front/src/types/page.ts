interface PageProps {
    name: string,
    url: string,
}

export const Pages: PageProps[] = [
    {
        name: "Equipos",
        url: "/teams"
    },
    {
        name: "Partidos",
        url: "/matche"
    },
]
