import NavBar from "../components/NavBar"

export default function NetworkMedia({children,}: {children: React.ReactNode}) {
  return (
    <section>
      <NavBar />
      <main>{children}</main>
    </section>
  )
}