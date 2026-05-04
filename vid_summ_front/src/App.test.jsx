import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthProvider } from "./components/authContext"
import { AppRoutes } from "./App"

function renderAppAt(path) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </AuthProvider>
  )
}

describe("AppRoutes", () => {
  it("shows the home page at /", () => {
    renderAppAt("/")
    expect(
      screen.getByRole("heading", { name: /youtube video summarizer/i })
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/paste youtube link here/i)).toBeInTheDocument()
  })

  it("shows the login page at /login", () => {
    renderAppAt("/login")
    expect(screen.getByRole("heading", { name: /welcome back/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /^login$/i })).toBeInTheDocument()
  })

  it("shows the sign-up page at /signup", () => {
    renderAppAt("/signup")
    expect(screen.getByRole("heading", { name: /^sign up$/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
  })
})
