import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.clearAllMocks()
})

vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(() => ({
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  })),
}))

vi.mock("react-markdown", () => ({
  default: function Markdown({ children }) {
    return <div data-testid="markdown">{children}</div>
  },
}))
