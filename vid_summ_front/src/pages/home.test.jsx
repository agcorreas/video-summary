import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import { AuthProvider } from "../components/authContext"
import Home from "./home"

vi.mock("axios")

describe("Home", () => {
  it("requests a summary when the user submits a YouTube URL", async () => {
    const user = userEvent.setup()
    axios.post.mockImplementation((url) => {
      if (url.includes("/summarize")) {
        return Promise.resolve({ data: { reply: "Key idea one and two." } })
      }
      return Promise.reject(new Error("unexpected URL"))
    })

    render(
      <AuthProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthProvider>
    )

    await user.type(
      screen.getByPlaceholderText(/paste youtube link here/i),
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    )
    await user.click(screen.getByRole("button", { name: /^summarize$/i }))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/summarize",
        expect.objectContaining({
          youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        })
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId("markdown")).toHaveTextContent("Key idea one and two.")
    })
  })

  it("does not call addsummary when saving without being logged in", async () => {
    const user = userEvent.setup()
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {})

    axios.post.mockImplementation((url) => {
      if (url.includes("/summarize")) {
        return Promise.resolve({ data: { reply: "Summary text" } })
      }
      return Promise.reject(new Error("unexpected URL"))
    })

    render(
      <AuthProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthProvider>
    )

    await user.type(screen.getByPlaceholderText(/paste youtube link here/i), "https://youtu.be/test")
    await user.click(screen.getByRole("button", { name: /^summarize$/i }))

    await waitFor(() => {
      expect(screen.getByTestId("markdown")).toHaveTextContent("Summary text")
    })

    await user.click(screen.getByTestId("save-summary-button"))

    expect(alertSpy).toHaveBeenCalledWith(
      "You need to be logged in to add the summary to your blog posts."
    )
    expect(axios.post).not.toHaveBeenCalledWith(
      "http://localhost:5000/addsummary",
      expect.anything()
    )

    alertSpy.mockRestore()
  })
})
