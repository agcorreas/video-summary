import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoute"

function LoginPage() {
  return <div>Login page</div>
}

function Secret() {
  return <div>Protected content</div>
}

describe("ProtectedRoute", () => {
  it("redirects to /login when there is no token", () => {
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/secret"
            element={
              <ProtectedRoute>
                <Secret />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText("Login page")).toBeInTheDocument()
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument()
  })

  it("renders children when a token is in localStorage", () => {
    localStorage.setItem("token", "test-token")

    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/secret"
            element={
              <ProtectedRoute>
                <Secret />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText("Protected content")).toBeInTheDocument()
    expect(screen.queryByText("Login page")).not.toBeInTheDocument()
  })
})
