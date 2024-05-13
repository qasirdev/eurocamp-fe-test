import { render, screen } from "@testing-library/react"
import Home from "../page"

describe("Home", () => {
  it("should display home page text", () =>  {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /all home functionality will go here/i
    })
    expect(heading).toBeInTheDocument()
  })
})
