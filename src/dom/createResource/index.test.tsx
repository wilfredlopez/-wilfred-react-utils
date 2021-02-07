// import React from "react"
// import { render, wait } from "@testing-library/react"
import { createResource } from "./index"

function testFetch(err?: boolean): Promise<[{ data: string }]> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (err) {
        // const e = new Error("You asked for it.")
        // rej(e)
      } else {
        res([{ data: "hello" }])
      }
    }, 2000)
  })
}

describe("createResource", () => {
  it("creates a resouce", () => {
    createResource(testFetch)
  })
  it("loads the resource a resource", async () => {
  //   const resource = createResource(testFetch)
  //   function ProfileDetails() {
  //     // Try to read user info, although it might not have loaded yet
  //     const data = resource.read()
  //     return (
  //       <h1 data-testid="before-read">
  //         {data.map((d, index) => {
  //           return (
  //             <p key={index} data-testid="testing">
  //               {d.data}
  //             </p>
  //           )
  //         })}
  //       </h1>
  //     )
  //   }

  //   const { getByText, getByTestId } = render(
  //     <React.Suspense fallback="Loading">
  //       <ProfileDetails />
  //     </React.Suspense>,
  //   )

  //   expect(getByText("Loading").textContent).toBe("Loading")
  //   await wait(
  //     () => {
  //       expect(getByTestId("testing").textContent).toBe("hello")
  //     },
  //     { timeout: 2000 },
  //   )
  })
})
