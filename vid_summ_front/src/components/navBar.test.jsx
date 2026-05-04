import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { AuthProvider } from "./authContext"
import NavBar from "./navBar"

function renderNavBar(initialPath = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <NavBar />
      </MemoryRouter>
    </AuthProvider>
  )
}

describe("NavBar", () => {
  it("shows login and sign up when the user is logged out", () => {
    renderNavBar()
    expect(screen.getByRole("link", { name: /^login$/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /^sign up$/i })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /saved summaries/i })).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /^logout$/i })).not.toBeInTheDocument()
  })

  it("shows saved summaries and logout when the user is logged in", () => {
    localStorage.setItem("token", "test-token")
    renderNavBar()

    expect(screen.getByRole("link", { name: /saved summaries/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /^logout$/i })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: /^login$/i })).not.toBeInTheDocument()
  })

  it("clears auth and stays navigable after logout", async () => {
    const user = userEvent.setup()
    localStorage.setItem("token", "test-token")
    renderNavBar()

    await user.click(screen.getByRole("button", { name: /^logout$/i }))

    expect(localStorage.getItem("token")).toBeNull()
    expect(screen.getByRole("link", { name: /^login$/i })).toBeInTheDocument()
  })
})
